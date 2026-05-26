<script setup>
import { useMenuStore } from "@/stores/menuStore";

const menuStore = useMenuStore();
</script>

<template>
  <v-container fluid>
    <div v-if="menuStore.activeTab === 'charactersheet'">
      <h1>Character Sheet</h1>
    </div>

    <div v-else-if="menuStore.activeTab === 'inventory'">
      <h1>Inventory</h1>
    </div>
  </v-container>
</template>
