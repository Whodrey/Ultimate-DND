import "dotenv/config";

import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";

import campaignRoutes from "./routes/campaignRoutes.js";

const app = express();
const port = process.env.PORT || 8080;
const mongoUrl =
  process.env.MONGO_URL || "mongodb://database:27017/ultimate-dnd";
const dbName = process.env.MONGO_DB || "ultimate-dnd";
const client = new MongoClient(mongoUrl);

let dbPromise;

function getDatabase() {
  if (!dbPromise) {
    dbPromise = client.connect().then(() => client.db(dbName));
  }

  return dbPromise;
}

app.use(cors());
app.use(express.json());

app.locals.getDatabase = getDatabase;

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

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend listening on port ${port}`);
});

async function shutdown() {
  await client.close();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
