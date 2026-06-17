import { ref } from "vue";
import { defineStore } from "pinia";
import { DMtabs, PlayerTabs } from "@/config/tabconfig";

function getInitialSubtabs(tabs) {
  return Object.fromEntries(
    tabs
      .filter((tab) => tab.subtabs?.length)
      .map((tab) => [tab.value, tab.subtabs[0].value]),
  );
}

export const useMenuStore = defineStore(
  "menu",
  () => {
    const activeDMTab = ref(DMtabs[0].value);
    const activePlayerTab = ref(PlayerTabs[0].value);
    const activeDMSubtabs = ref(getInitialSubtabs(DMtabs));
    const activePlayerSubtabs = ref(getInitialSubtabs(PlayerTabs));

    return {
      DMtabs,
      PlayerTabs,
      activeDMTab,
      activePlayerTab,
      activeDMSubtabs,
      activePlayerSubtabs,
    };
  },
  {
    persist: true,
  },
);
