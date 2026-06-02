import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();
const collectionName = "campaigns";

function asyncRoute(handler) {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

async function getCampaignsCollection(request) {
  const db = await request.app.locals.getDatabase();

  return db.collection(collectionName);
}

function serializeCampaign(campaign) {
  return {
    ...campaign,
    _id: campaign._id.toString(),
  };
}

router.get(
  "/",
  asyncRoute(async (request, response) => {
    const campaigns = await getCampaignsCollection(request);
    const campaignList = await campaigns
      .find({})
      .sort({ updatedAt: -1, createdAt: -1 })
      .toArray();

    response.json(campaignList.map(serializeCampaign));
  }),
);

router.post(
  "/",
  asyncRoute(async (request, response) => {
    const { _id, id, ...campaignData } = request.body ?? {};
    const name =
      typeof campaignData.name === "string" ? campaignData.name.trim() : "";

    if (!name) {
      return response.status(400).json({
        message: "Campaign name is required.",
      });
    }

    const campaigns = await getCampaignsCollection(request);

    const now = new Date();
    const campaign = {
      ...campaignData,
      name,
      createdAt: now,
      updatedAt: now,
    };

    const result = await campaigns.insertOne(campaign);

    return response.status(201).json(
      serializeCampaign({
        ...campaign,
        _id: result.insertedId,
      }),
    );
  }),
);

router.get(
  "/:campaignId",
  asyncRoute(async (request, response) => {
    const campaignId = request.params.campaignId;

    if (!ObjectId.isValid(campaignId)) {
      return response.status(400).json({
        message: "Invalid campaign id.",
      });
    }

    const campaigns = await getCampaignsCollection(request);
    const campaign = await campaigns.findOne({
      _id: new ObjectId(campaignId),
    });

    if (!campaign) {
      return response.status(404).json({
        message: "Campaign not found.",
      });
    }

    return response.json(serializeCampaign(campaign));
  }),
);

export default router;
