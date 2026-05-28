import WorldBuilding from "@/views/DungeonMaster/WorldBuilding.vue";
import WorldBuildingMaps from "@/views/DungeonMaster/WorldBuilding/Maps.vue";
import WorldBuildingCities from "@/views/DungeonMaster/WorldBuilding/Cities.vue";
import WorldBuildingDungeons from "@/views/DungeonMaster/WorldBuilding/Dungeons.vue";
import WorldBuildingEvents from "@/views/DungeonMaster/WorldBuilding/Events.vue";
import NPCManager from "@/views/DungeonMaster/NPCManager.vue";
import CombatManager from "@/views/DungeonMaster/CombatManager.vue";
import Overview from "@/views/DungeonMaster/Overview.vue";

import CharacterSheet from "@/views/Player/CharacterSheet.vue";
import Inventory from "@/views/Player/Inventory.vue";

export const DMtabs = [
  {
    title: "Overview",
    value: "overview",
    component: Overview,
  },
  {
    title: "World Building",
    value: "worldbuilding",
    component: WorldBuilding,
    subtabs: [
      {
        title: "Maps",
        value: "maps",
        component: WorldBuildingMaps,
      },
      {
        title: "Cities",
        value: "cities",
        component: WorldBuildingCities,
      },
      {
        title: "Dungeons",
        value: "dungeons",
        component: WorldBuildingDungeons,
      },
      {
        title: "Events",
        value: "events",
        component: WorldBuildingEvents,
      },
    ],
  },
  {
    title: "NPC Manager",
    value: "npcmanager",
    component: NPCManager,
  },
  {
    title: "Combat Manager",
    value: "combatmanager",
    component: CombatManager,
  },
];

export const PlayerTabs = [
  {
    title: "Character Sheet",
    value: "charactersheet",
    component: CharacterSheet,
  },
  {
    title: "Inventory",
    value: "inventory",
    component: Inventory,
  },
];
