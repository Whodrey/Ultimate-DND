<script setup>
import { computed } from "vue";
import { useMenuStore } from "@/stores/menuStore";

const menuStore = useMenuStore();

const activeView = computed(() => {
  return (
    menuStore.DMtabs.find((tab) => tab.value === menuStore.activeDMTab)
      ?.component ?? menuStore.DMtabs[0].component
  );
});
</script>

<template>
  <v-container fluid>
    <component :is="activeView" />
  </v-container>
</template>
