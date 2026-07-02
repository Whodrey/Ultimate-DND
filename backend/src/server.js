import "dotenv/config";

import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";

import campaignRoutes from "./routes/campaignRoutes.js";
import entityRoutes from "./routes/entityRoutes.js";
import entityRelationRoutes from "./routes/entityRelationRoutes.js";
import { seedDevCampaign } from "./seeds/devCampaign.js";

const app = express();
const port = process.env.PORT || 8080;
const mongoUrl =
  process.env.MONGO_URL || "mongodb://database:27017/ultimate-dnd";
const dbName = process.env.MONGO_DB || "ultimate-dnd";
const client = new MongoClient(mongoUrl);

let dbPromise;

function getDatabase() {
  if (!dbPromise) {
    dbPromise = client
      .connect()
      .then(() => client.db(dbName))
      .catch((error) => {
        dbPromise = null;
        throw error;
      });
  }

  return dbPromise;
}

function parsePositiveInteger(value, fallback) {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback;
}

function shouldSeedDevCampaign() {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.SEED_DEV_CAMPAIGN === "true"
  );
}

async function seedDevelopmentCampaign(attempt = 1) {
  const maxAttempts = parsePositiveInteger(
    process.env.SEED_DEV_CAMPAIGN_ATTEMPTS,
    10,
  );
  const retryDelayMs = parsePositiveInteger(
    process.env.SEED_DEV_CAMPAIGN_RETRY_DELAY_MS,
    2000,
  );

  try {
    const db = await getDatabase();
    const result = await seedDevCampaign(db);
    const action = result.created ? "Created" : "Found existing";

    console.log(`${action} dev campaign ${result.campaignId}.`);
  } catch (error) {
    if (attempt >= maxAttempts) {
      console.error("Could not seed the dev campaign.");
      console.error(error);
      return;
    }

    console.warn(
      `Could not seed the dev campaign yet. Retrying in ${retryDelayMs}ms.`,
    );

    setTimeout(() => {
      seedDevelopmentCampaign(attempt + 1);
    }, retryDelayMs);
  }
}

app.use(cors());
app.use(express.json());

app.locals.getDatabase = getDatabase;

app.use("/campaigns/:campaignId/entities", entityRoutes);
app.use("/campaigns/:campaignId/relations", entityRelationRoutes);
app.use("/campaigns", campaignRoutes);

app.get("/", (request, response) => {
  response.json({
    name: "ultimate-dnd-api",
    status: "running",
  });
});

app.get("/health", async (request, response) => {
  try {
    const db = await getDatabase();
    await db.command({ ping: 1 });

    response.json({
      status: "ok",
      database: "connected",
    });
  } catch {
    response.status(503).json({
      status: "error",
      database: "unavailable",
    });
  }
});

app.use((error, request, response, next) => {
  console.error(error);

  response.status(500).json({
    message: "Internal server error",
  });
});

if (shouldSeedDevCampaign()) {
  seedDevelopmentCampaign();
}

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend listening on port ${port}`);
});

async function shutdown() {
  await client.close();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
