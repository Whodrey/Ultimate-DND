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

function normalizeEntityType(type) {
  const normalizedType =
    typeof type === "string" ? type.trim().toLowerCase() : "";

  if (!/^[a-z][a-z0-9_]{0,40}$/.test(normalizedType)) {
    const error = new Error("Entity type is required.");
    error.statusCode = 400;
    throw error;
  }

  return normalizedType;
}

function getDetailCollectionName(type) {
  return `${type}_details`;
}

function sanitizeDetails(details) {
  if (!details || typeof details !== "object" || Array.isArray(details)) {
    return {};
  }

  const {
    _id,
    id,
    entityId,
    campaignId,
    createdAt,
    updatedAt,
    ...detailData
  } = details;

  return detailData;
}

function serializeDetails(details) {
  if (!details) return {};

  const {
    _id,
    entityId,
    campaignId,
    createdAt,
    updatedAt,
    ...detailData
  } = details;

  return detailData;
}

function serializeEntity(entity, details) {
  return {
    id: entity._id.toString(),
    _id: entity._id.toString(),
    campaignId: entity.campaignId.toString(),
    type: entity.type,
    name: entity.name,
    summary: entity.summary ?? "",
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    details: serializeDetails(details),
  };
}

async function getEntityWithDetails(db, entity) {
  const details = await db.collection(getDetailCollectionName(entity.type)).findOne({
    campaignId: entity.campaignId,
    entityId: entity._id,
  });

  return serializeEntity(entity, details);
}

router.get(
  "/",
  asyncRoute(async (request, response) => {
    const db = await getDatabase(request);
    const campaignId = parseObjectId(request.params.campaignId, "campaign id");
    const filter = { campaignId };

    await ensureCampaignExists(db, campaignId);

    if (request.query.type) {
      filter.type = normalizeEntityType(request.query.type);
    }

    const entities = await db
      .collection("entities")
      .find(filter)
      .sort({ updatedAt: -1, createdAt: -1 })
      .toArray();

    const serializedEntities = await Promise.all(
      entities.map((entity) => getEntityWithDetails(db, entity)),
    );

    response.json(serializedEntities);
  }),
);

router.post(
  "/",
  asyncRoute(async (request, response) => {
    const db = await getDatabase(request);
    const campaignId = parseObjectId(request.params.campaignId, "campaign id");
    const type = normalizeEntityType(request.body?.type);
    const name = typeof request.body?.name === "string" ? request.body.name.trim() : "";

    await ensureCampaignExists(db, campaignId);

    if (!name) {
      return response.status(400).json({
        message: "Entity name is required.",
      });
    }

    const now = new Date();
    const entity = {
      campaignId,
      type,
      name,
      summary:
        typeof request.body?.summary === "string"
          ? request.body.summary.trim()
          : "",
      createdAt: now,
      updatedAt: now,
    };

    const entityResult = await db.collection("entities").insertOne(entity);
    const insertedEntity = {
      ...entity,
      _id: entityResult.insertedId,
    };

    const details = {
      campaignId,
      entityId: entityResult.insertedId,
      ...sanitizeDetails(request.body?.details),
      createdAt: now,
      updatedAt: now,
    };

    await db.collection(getDetailCollectionName(type)).insertOne(details);

    response.status(201).json(serializeEntity(insertedEntity, details));
  }),
);

router.get(
  "/:entityId",
  asyncRoute(async (request, response) => {
    const db = await getDatabase(request);
    const campaignId = parseObjectId(request.params.campaignId, "campaign id");
    const entityId = parseObjectId(request.params.entityId, "entity id");

    await ensureCampaignExists(db, campaignId);

    const entity = await db.collection("entities").findOne({
      _id: entityId,
      campaignId,
    });

    if (!entity) {
      return response.status(404).json({
        message: "Entity not found.",
      });
    }

    response.json(await getEntityWithDetails(db, entity));
  }),
);

router.patch(
  "/:entityId",
  asyncRoute(async (request, response) => {
    const db = await getDatabase(request);
    const campaignId = parseObjectId(request.params.campaignId, "campaign id");
    const entityId = parseObjectId(request.params.entityId, "entity id");

    await ensureCampaignExists(db, campaignId);

    const existingEntity = await db.collection("entities").findOne({
      _id: entityId,
      campaignId,
    });

    if (!existingEntity) {
      return response.status(404).json({
        message: "Entity not found.",
      });
    }

    const name =
      typeof request.body?.name === "string" ? request.body.name.trim() : undefined;

    if (name === "") {
      return response.status(400).json({
        message: "Entity name is required.",
      });
    }

    const now = new Date();
    const entityUpdate = {
      updatedAt: now,
    };

    if (name !== undefined) {
      entityUpdate.name = name;
    }

    if (typeof request.body?.summary === "string") {
      entityUpdate.summary = request.body.summary.trim();
    }

    await db.collection("entities").updateOne(
      {
        _id: entityId,
        campaignId,
      },
      {
        $set: entityUpdate,
      },
    );

    const detailUpdate = {
      ...sanitizeDetails(request.body?.details),
      updatedAt: now,
    };

    await db.collection(getDetailCollectionName(existingEntity.type)).updateOne(
      {
        campaignId,
        entityId,
      },
      {
        $set: detailUpdate,
        $setOnInsert: {
          campaignId,
          entityId,
          createdAt: now,
        },
      },
      { upsert: true },
    );

    const updatedEntity = await db.collection("entities").findOne({
      _id: entityId,
      campaignId,
    });

    response.json(await getEntityWithDetails(db, updatedEntity));
  }),
);

router.delete(
  "/:entityId",
  asyncRoute(async (request, response) => {
    const db = await getDatabase(request);
    const campaignId = parseObjectId(request.params.campaignId, "campaign id");
    const entityId = parseObjectId(request.params.entityId, "entity id");

    await ensureCampaignExists(db, campaignId);

    const entity = await db.collection("entities").findOne({
      _id: entityId,
      campaignId,
    });

    if (!entity) {
      return response.status(404).json({
        message: "Entity not found.",
      });
    }

    await db.collection("entities").deleteOne({
      _id: entityId,
      campaignId,
    });
    await db.collection(getDetailCollectionName(entity.type)).deleteOne({
      entityId,
      campaignId,
    });
    await db.collection("entity_relations").deleteMany({
      campaignId,
      $or: [{ fromEntityId: entityId }, { toEntityId: entityId }],
    });

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
