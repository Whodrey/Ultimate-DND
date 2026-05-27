<script setup>
import { computed } from "vue";
import { useMenuStore } from "@/stores/menuStore";

const menuStore = useMenuStore();

const activeView = computed(() => {
  return (
    menuStore.PlayerTabs.find((tab) => tab.value === menuStore.activePlayerTab)
      ?.component ?? menuStore.PlayerTabs[0].component
  );
});
</script>

<template>
  <v-container fluid>
    <component :is="activeView" />
  </v-container>
</template>
