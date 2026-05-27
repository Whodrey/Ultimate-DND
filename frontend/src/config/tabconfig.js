import WorldBuilding from "@/views/DungeonMaster/WorldBuilding.vue";
import NPCManager from "@/views/DungeonMaster/NPCManager.vue";
import CombatManager from "@/views/DungeonMaster/CombatManager.vue";
import Overview from "@/views/DungeonMaster/Overview.vue";

import CharacterSheet from "@/views/Player/CharacterSheet.vue";
import Inventory from "@/views/Player/Inventory.vue";

export const DMtabs = [
  {
    text: "Overview",
    value: "overview",
    component: Overview,
  },
  {
    text: "World Building",
    value: "worldbuilding",
    component: WorldBuilding,
  },
  {
    text: "NPC Manager",
    value: "npcmanager",
    component: NPCManager,
  },
  {
    text: "Combat Manager",
    value: "combatmanager",
    component: CombatManager,
  },
];

export const PlayerTabs = [
  {
    text: "Character Sheet",
    value: "charactersheet",
    component: CharacterSheet,
  },
  {
    text: "Inventory",
    value: "inventory",
    component: Inventory,
  },
];
