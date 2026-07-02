import "dotenv/config";

import { MongoClient } from "mongodb";

import { seedDevCampaign } from "../seeds/devCampaign.js";

const mongoUrl =
  process.env.MONGO_URL || "mongodb://database:27017/ultimate-dnd";
const dbName = process.env.MONGO_DB || "ultimate-dnd";
const reset = process.argv.includes("--reset");

const client = new MongoClient(mongoUrl);

try {
  await client.connect();

  const result = await seedDevCampaign(client.db(dbName), { reset });
  const verb = result.created ? "Created" : "Found existing";

  console.log(`${verb} dev campaign ${result.campaignId}.`);

  if (!result.created && !reset) {
    console.log("Use npm run seed:dev:reset to recreate the sample data.");
  }
} catch (error) {
  console.error("Could not seed the dev campaign.");
  console.error(error);
  process.exitCode = 1;
} finally {
  await client.close();
}
