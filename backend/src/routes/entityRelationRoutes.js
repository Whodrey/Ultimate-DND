import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router({ mergeParams: true });

function asyncRoute(handler) {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}

async function getDatabase(request) {
  return request.app.locals.getDatabase();
}

async function ensureCampaignExists(db, campaignId) {
  const campaign = await db.collection("campaigns").findOne({
    _id: campaignId,
  });

  if (!campaign) {
    const error = new Error("Campaign not found.");
    error.statusCode = 404;
    throw error;
  }

  return campaign;
}

function parseObjectId(id, label) {
  if (!ObjectId.isValid(id)) {
    const error = new Error(`Invalid ${label}.`);
    error.statusCode = 400;
    throw error;
  }

  return new ObjectId(id);
}

function normalizeRelationType(type) {
  const normalizedType =
    typeof type === "string" ? type.trim().toLowerCase() : "";

  if (!/^[a-z][a-z0-9_]{0,40}$/.test(normalizedType)) {
    const error = new Error("Relation type is required.");
    error.statusCode = 400;
    throw error;
  }

  return normalizedType;
}

function serializeRelation(relation) {
  return {
    id: relation._id.toString(),
    _id: relation._id.toString(),
    campaignId: relation.campaignId.toString(),
    fromEntityId: relation.fromEntityId.toString(),
    toEntityId: relation.toEntityId.toString(),
    type: relation.type,
    notes: relation.notes ?? "",
    createdAt: relation.createdAt,
    updatedAt: relation.updatedAt,
  };
}

async function ensureEntityExists(db, campaignId, entityId, label) {
  const entity = await db.collection("entities").findOne({
    _id: entityId,
    campaignId,
  });

  if (!entity) {
    const error = new Error(`${label} not found in this campaign.`);
    error.statusCode = 400;
    throw error;
  }

  return entity;
}

router.get(
  "/",
  asyncRoute(async (request, response) => {
    const db = await getDatabase(request);
    const campaignId = parseObjectId(request.params.campaignId, "campaign id");
    const filter = { campaignId };

    await ensureCampaignExists(db, campaignId);

    if (request.query.entityId) {
      const entityId = parseObjectId(request.query.entityId, "entity id");

      filter.$or = [{ fromEntityId: entityId }, { toEntityId: entityId }];
    }

    const relations = await db
      .collection("entity_relations")
      .find(filter)
      .sort({ updatedAt: -1, createdAt: -1 })
      .toArray();

    response.json(relations.map(serializeRelation));
  }),
);

router.post(
  "/",
  asyncRoute(async (request, response) => {
    const db = await getDatabase(request);
    const campaignId = parseObjectId(request.params.campaignId, "campaign id");
    const fromEntityId = parseObjectId(request.body?.fromEntityId, "from entity id");
    const toEntityId = parseObjectId(request.body?.toEntityId, "to entity id");
    const type = normalizeRelationType(request.body?.type);

    await ensureCampaignExists(db, campaignId);

    await ensureEntityExists(db, campaignId, fromEntityId, "Source entity");
    await ensureEntityExists(db, campaignId, toEntityId, "Target entity");

    const now = new Date();
    const relation = {
      campaignId,
      fromEntityId,
      toEntityId,
      type,
      notes:
        typeof request.body?.notes === "string" ? request.body.notes.trim() : "",
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection("entity_relations").insertOne(relation);

    response.status(201).json(
      serializeRelation({
        ...relation,
        _id: result.insertedId,
      }),
    );
  }),
);

router.delete(
  "/:relationId",
  asyncRoute(async (request, response) => {
    const db = await getDatabase(request);
    const campaignId = parseObjectId(request.params.campaignId, "campaign id");
    const relationId = parseObjectId(request.params.relationId, "relation id");

    await ensureCampaignExists(db, campaignId);

    const result = await db.collection("entity_relations").deleteOne({
      _id: relationId,
      campaignId,
    });

    if (!result.deletedCount) {
      return response.status(404).json({
        message: "Relation not found.",
      });
    }

    response.status(204).send();
  }),
);

router.use((error, request, response, next) => {
  if (error.statusCode) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return next(error);
});

export default router;
