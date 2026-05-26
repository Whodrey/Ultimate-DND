import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore(
  "menu",
  () => {
    const DMtabs = ref([
      { text: "World Building", value: "worldbuilding" },
      { text: "NPC Manager", value: "npcmanager" },
    ]);
    const PlayerTabs = ref([
      { text: "Character Sheet", value: "charactersheet" },
      { text: "Inventory", value: "inventory" },
    ]);
    const activeTab = ref(null);

    return { DMtabs, PlayerTabs, activeTab };
  },
  {
    persist: true,
  },
);
