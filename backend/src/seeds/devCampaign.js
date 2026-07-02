import { ObjectId } from "mongodb";

export const DEV_CAMPAIGN_SEED_KEY = "dev-example-shattered-coast";

const campaignId = new ObjectId("66f000000000000000000001");

const species = [
  "Aasimar",
  "Dragonborn",
  "Dwarf",
  "Elf",
  "Gnome",
  "Goliath",
  "Halfling",
  "Human",
  "Orc",
  "Tiefling",
];

function demographics(values) {
  const valuesBySpecies = new Map(Object.entries(values));

  return species.map((name) => ({
    name,
    val: valuesBySpecies.get(name) ?? 0,
  }));
}

const campaign = {
  _id: campaignId,
  seedKey: DEV_CAMPAIGN_SEED_KEY,
  isDevExample: true,
  name: "Dev Campaign: Shattered Coast",
  summary:
    "A compact sandbox campaign for exercising campaign, city, location, NPC, and relation data.",
  description:
    "The lighthouse at Saltglass Keep has gone dark, ships are vanishing near Gloamharbor, and every faction on the coast wants the party to blame someone else.",
  status: "development",
  startingLevel: 3,
  tone: ["coastal mystery", "political pressure", "dangerous ruins"],
};

const entities = [
  {
    key: "gloamharbor",
    id: new ObjectId("66f000000000000000000010"),
    detailId: new ObjectId("66f000000000000000000110"),
    type: "city",
    name: "Gloamharbor",
    summary:
      "A rain-slick port city where guild ledgers matter as much as blades.",
    details: {
      size: "City",
      population: 18400,
      vibe: ["Bustling", "Port", "Magical", "Corrupt"],
      demographics: demographics({
        Human: 34,
        Elf: 16,
        Dwarf: 13,
        Halfling: 10,
        Tiefling: 8,
        Gnome: 7,
        Dragonborn: 5,
        Orc: 4,
        Aasimar: 2,
        Goliath: 1,
      }),
      description:
        "Gloamharbor is the main trade hub of the Shattered Coast. Dockworkers whisper about ships returning without crews, while the city council quietly hires investigators to avoid panic.",
    },
  },
  {
    key: "brindlecross",
    id: new ObjectId("66f000000000000000000011"),
    detailId: new ObjectId("66f000000000000000000111"),
    type: "city",
    name: "Brindlecross",
    summary:
      "A market town built around an old stone bridge and louder old grudges.",
    details: {
      size: "Town",
      population: 3200,
      vibe: ["Quiet", "Farming", "Religious"],
      demographics: demographics({
        Human: 45,
        Halfling: 18,
        Dwarf: 12,
        Elf: 9,
        Gnome: 7,
        Orc: 4,
        Tiefling: 3,
        Dragonborn: 1,
        Aasimar: 1,
      }),
      description:
        "Brindlecross supplies most inland caravans. Its shrine bells now ring at odd hours because Brother Oren believes something under the river has started answering prayers.",
    },
  },
  {
    key: "emberfall",
    id: new ObjectId("66f000000000000000000012"),
    detailId: new ObjectId("66f000000000000000000112"),
    type: "city",
    name: "Emberfall",
    summary:
      "A scarred mining village at the foot of warm black cliffs.",
    details: {
      size: "Village",
      population: 780,
      vibe: ["Mining", "Dangerous", "Industrial"],
      demographics: demographics({
        Dwarf: 35,
        Human: 28,
        Orc: 12,
        Gnome: 8,
        Goliath: 6,
        Dragonborn: 5,
        Tiefling: 3,
        Elf: 2,
        Halfling: 1,
      }),
      description:
        "Emberfall should be rich from iron and emberglass. Instead, the Broken Crown Mine keeps swallowing workers, tools, and recently an entire rescue crew.",
    },
  },
  {
    key: "saltglass-keep",
    id: new ObjectId("66f000000000000000000020"),
    detailId: new ObjectId("66f000000000000000000120"),
    type: "location",
    name: "Saltglass Keep",
    summary:
      "A sea-battered lighthouse fortress whose beacon has gone black.",
    details: {
      locationType: "dungeon",
      danger: 4,
      state: 3,
      description:
        "Saltglass Keep still stands, but the upper lantern room is webbed with translucent crystal and the lower halls smell of brine. Fresh bootprints lead inside.",
    },
  },
  {
    key: "moonwell-grotto",
    id: new ObjectId("66f000000000000000000021"),
    detailId: new ObjectId("66f000000000000000000121"),
    type: "location",
    name: "Moonwell Grotto",
    summary:
      "A tidal cave where silver water reflects stars at noon.",
    details: {
      locationType: "grotto",
      danger: 2,
      state: 5,
      description:
        "The Moonwell Grotto is sacred to local fishers and smugglers alike. At low tide, a submerged stair leads to a shrine marked with lunar runes.",
    },
  },
  {
    key: "broken-crown-mine",
    id: new ObjectId("66f000000000000000000022"),
    detailId: new ObjectId("66f000000000000000000122"),
    type: "location",
    name: "Broken Crown Mine",
    summary:
      "An abandoned mine where the newest cave-in opened into older stonework.",
    details: {
      locationType: "mine",
      danger: 5,
      state: 1,
      description:
        "The old mine is officially sealed. Unofficially, Emberfall families still leave lamps at the gate for missing kin who sometimes answer from below.",
    },
  },
  {
    key: "waywatch-camp",
    id: new ObjectId("66f000000000000000000023"),
    detailId: new ObjectId("66f000000000000000000123"),
    type: "location",
    name: "Waywatch Camp",
    summary:
      "A muddy checkpoint on the coast road with fresh horses and nervous scouts.",
    details: {
      locationType: "camp",
      danger: 1,
      state: 5,
      description:
        "Waywatch Camp is the party's easiest place to get rumors, rations, and a warning that the next stretch of road is being watched from the cliffs.",
    },
  },
  {
    key: "captain-mara-vey",
    id: new ObjectId("66f000000000000000000030"),
    detailId: new ObjectId("66f000000000000000000130"),
    type: "npc",
    name: "Captain Mara Vey",
    summary:
      "A practical harbor captain trying to keep trade moving without starting a panic.",
    details: {
      role: "Harbor captain",
      disposition: "ally",
      species: "Human",
      location: "Gloamharbor",
      secret:
        "Mara has one survivor hidden in a customs cellar, but the survivor only speaks in lighthouse bell patterns.",
    },
  },
  {
    key: "brother-oren-thatch",
    id: new ObjectId("66f000000000000000000031"),
    detailId: new ObjectId("66f000000000000000000131"),
    type: "npc",
    name: "Brother Oren Thatch",
    summary:
      "A soft-spoken bridge priest who keeps hearing confessions from the river.",
    details: {
      role: "Priest of the Crossing",
      disposition: "neutral",
      species: "Halfling",
      location: "Brindlecross",
      secret:
        "Oren knows the Moonwell Grotto answers questions, but each answer changes a memory.",
    },
  },
  {
    key: "sable-fen",
    id: new ObjectId("66f000000000000000000032"),
    detailId: new ObjectId("66f000000000000000000132"),
    type: "npc",
    name: "Sable Fen",
    summary:
      "A smuggler broker selling maps that should not exist yet.",
    details: {
      role: "Smuggler broker",
      disposition: "neutral",
      species: "Tiefling",
      location: "Gloamharbor",
      secret:
        "Sable's newest map marks a door inside Saltglass Keep that appears only during storms.",
    },
  },
  {
    key: "candle-baron",
    id: new ObjectId("66f000000000000000000033"),
    detailId: new ObjectId("66f000000000000000000133"),
    type: "npc",
    name: "The Candle Baron",
    summary:
      "A masked patron buying debts, shipwreck rights, and silence.",
    details: {
      role: "Hidden antagonist",
      disposition: "enemy",
      species: "Unknown",
      location: "Unknown",
      secret:
        "The Candle Baron is funding expeditions below Broken Crown Mine to recover a crown that burns underwater.",
    },
  },
];

const relations = [
  {
    id: new ObjectId("66f000000000000000000200"),
    from: "gloamharbor",
    to: "saltglass-keep",
    type: "near",
    notes: "Gloamharbor ships use Saltglass Keep as their final marker before open sea.",
  },
  {
    id: new ObjectId("66f000000000000000000201"),
    from: "brindlecross",
    to: "moonwell-grotto",
    type: "protects",
    notes: "Brindlecross elders keep the grotto's rituals and dangers out of official records.",
  },
  {
    id: new ObjectId("66f000000000000000000202"),
    from: "emberfall",
    to: "broken-crown-mine",
    type: "contains",
    notes: "The mine is the reason Emberfall exists, and now the reason it may be abandoned.",
  },
  {
    id: new ObjectId("66f000000000000000000203"),
    from: "waywatch-camp",
    to: "gloamharbor",
    type: "guards",
    notes: "Waywatch scouts report to Gloamharbor's harbor office every second dawn.",
  },
  {
    id: new ObjectId("66f000000000000000000204"),
    from: "captain-mara-vey",
    to: "gloamharbor",
    type: "based_in",
    notes: "Mara can authorize access to docks, manifests, and confiscated cargo.",
  },
  {
    id: new ObjectId("66f000000000000000000205"),
    from: "sable-fen",
    to: "saltglass-keep",
    type: "investigates",
    notes: "Sable wants whatever made the lighthouse glass grow inward.",
  },
  {
    id: new ObjectId("66f000000000000000000206"),
    from: "candle-baron",
    to: "broken-crown-mine",
    type: "exploits",
    notes: "The Candle Baron's agents are paying miners to reopen sealed shafts.",
  },
  {
    id: new ObjectId("66f000000000000000000207"),
    from: "brother-oren-thatch",
    to: "moonwell-grotto",
    type: "studies",
    notes: "Oren's journal can point the party toward the grotto's safest tide window.",
  },
];

function getDetailCollectionName(type) {
  return `${type}_details`;
}

function getSeededCampaignFilter() {
  return {
    $or: [{ _id: campaignId }, { seedKey: DEV_CAMPAIGN_SEED_KEY }],
  };
}

async function deleteCampaignData(db, campaignIds) {
  if (!campaignIds.length) return;

  const entitiesToDelete = await db
    .collection("entities")
    .find({ campaignId: { $in: campaignIds } })
    .project({ _id: 1, campaignId: 1, type: 1 })
    .toArray();

  await db.collection("entity_relations").deleteMany({
    campaignId: { $in: campaignIds },
  });

  await Promise.all(
    entitiesToDelete.map((entity) =>
      db.collection(getDetailCollectionName(entity.type)).deleteMany({
        campaignId: entity.campaignId,
        entityId: entity._id,
      }),
    ),
  );

  await db.collection("entities").deleteMany({
    campaignId: { $in: campaignIds },
  });

  await db.collection("campaigns").deleteMany({
    _id: { $in: campaignIds },
  });
}

async function resetExistingSeed(db) {
  const seededCampaigns = await db
    .collection("campaigns")
    .find(getSeededCampaignFilter())
    .project({ _id: 1 })
    .toArray();

  await deleteCampaignData(
    db,
    seededCampaigns.map((seededCampaign) => seededCampaign._id),
  );
}

async function createSeed(db) {
  const now = new Date();
  const entityIdsByKey = new Map(
    entities.map((entity) => [entity.key, entity.id]),
  );

  await db.collection("campaigns").insertOne({
    ...campaign,
    createdAt: now,
    updatedAt: now,
  });

  await db.collection("entities").insertMany(
    entities.map((entity) => ({
      _id: entity.id,
      campaignId,
      seedKey: `${DEV_CAMPAIGN_SEED_KEY}:${entity.key}`,
      type: entity.type,
      name: entity.name,
      summary: entity.summary,
      createdAt: now,
      updatedAt: now,
    })),
  );

  await Promise.all(
    entities.map((entity) =>
      db.collection(getDetailCollectionName(entity.type)).insertOne({
        _id: entity.detailId,
        campaignId,
        entityId: entity.id,
        ...entity.details,
        createdAt: now,
        updatedAt: now,
      }),
    ),
  );

  const relationDocuments = relations.map((relation) => {
    const fromEntityId = entityIdsByKey.get(relation.from);
    const toEntityId = entityIdsByKey.get(relation.to);

    if (!fromEntityId || !toEntityId) {
      throw new Error(`Invalid dev campaign relation ${relation.id}.`);
    }

    return {
      _id: relation.id,
      campaignId,
      fromEntityId,
      toEntityId,
      type: relation.type,
      notes: relation.notes,
      createdAt: now,
      updatedAt: now,
    };
  });

  await db.collection("entity_relations").insertMany(relationDocuments);
}

export async function seedDevCampaign(db, { reset = false } = {}) {
  if (reset) {
    await resetExistingSeed(db);
  }

  const existingCampaign = await db
    .collection("campaigns")
    .findOne(getSeededCampaignFilter());

  if (existingCampaign) {
    return {
      campaignId: existingCampaign._id.toString(),
      created: false,
      reset,
    };
  }

  await createSeed(db);

  return {
    campaignId: campaignId.toString(),
    created: true,
    reset,
  };
}
