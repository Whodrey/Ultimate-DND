import { defineAsyncComponent, markRaw } from "vue";

const view = (loader) => markRaw(defineAsyncComponent(loader));

/**
  {
  title: "",
  value: "",
  component: view(() => import("")),
  },
 */

export const DMtabs = [
  {
    title: "Overview",
    value: "overview",
    component: view(() => import("@/views/DungeonMaster/Overview.vue")),
  },
  {
    title: "World Building",
    value: "worldbuilding",
    component: view(() => import("@/views/DungeonMaster/WorldBuilding.vue")),
    subtabs: [
      {
        title: "Maps",
        value: "maps",
        component: view(
          () => import("@/views/DungeonMaster/WorldBuilding/Maps.vue"),
        ),
      },
      {
        title: "Cities",
        value: "cities",
        component: view(
          () => import("@/views/DungeonMaster/WorldBuilding/Cities.vue"),
        ),
      },
      {
        title: "Dungeons",
        value: "dungeons",
        component: view(
          () => import("@/views/DungeonMaster/WorldBuilding/Dungeons.vue"),
        ),
      },
      {
        title: "Events",
        value: "events",
        component: view(
          () => import("@/views/DungeonMaster/WorldBuilding/Events.vue"),
        ),
      },
    ],
  },
  {
    title: "NPC Manager",
    value: "npcmanager",
    component: view(() => import("@/views/DungeonMaster/NPCManager.vue")),
    subtabs: [
      {
        title: "All",
        value: "all",
        component: view(
          () => import("@/views/DungeonMaster/NPCManager/NPCAll.vue"),
        ),
      },
      {
        title: "Allies",
        value: "allies",
        component: view(
          () => import("@/views/DungeonMaster/NPCManager/NPCAllies.vue"),
        ),
      },
      {
        title: "Enemies",
        value: "enemies",
        component: view(
          () => import("@/views/DungeonMaster/NPCManager/NPCEnemies.vue"),
        ),
      },
      {
        title: "Neutral",
        value: "neutral",
        component: view(
          () => import("@/views/DungeonMaster/NPCManager/NPCNeutral.vue"),
        ),
      },
    ],
  },
  {
    title: "Combat Manager",
    value: "combatmanager",
    component: view(() => import("@/views/DungeonMaster/CombatManager.vue")),
  },
];

export const PlayerTabs = [
  {
    title: "Character Sheet",
    value: "charactersheet",
    component: view(() => import("@/views/Player/CharacterSheet.vue")),
  },
  {
    title: "Inventory",
    value: "inventory",
    component: view(() => import("@/views/Player/Inventory.vue")),
  },
];
