<script setup>
import { computed } from "vue";
import { useMenuStore } from "@/stores/menuStore";

const menuStore = useMenuStore();

const activeView = computed(() => {
  const activeTab =
    menuStore.DMtabs.find((tab) => tab.value === menuStore.activeDMTab) ??
    menuStore.DMtabs[0];

  if (activeTab.subtabs?.length) {
    const activeSubtabValue =
      menuStore.activeDMSubtabs[activeTab.value] ?? activeTab.subtabs[0].value;

    return (
      activeTab.subtabs.find((subtab) => subtab.value === activeSubtabValue)
        ?.component ?? activeTab.subtabs[0].component
    );
  }

  return activeTab.component;
});
</script>

<template>
  <v-container fluid>
    <component :is="activeView" />
  </v-container>
</template>
