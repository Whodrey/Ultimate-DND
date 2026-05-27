import { ref } from "vue";
import { defineStore } from "pinia";
import { DMtabs, PlayerTabs } from "@/config/tabconfig";

export const useMenuStore = defineStore("menu", () => {
  const activeDMTab = ref(DMtabs[0].value);
  const activePlayerTab = ref(PlayerTabs[0].value);

  return { DMtabs, PlayerTabs, activeDMTab, activePlayerTab };
});
