<script setup>
import { useMenuStore } from "@/stores/menuStore";

const menuStore = useMenuStore();
</script>

<template>
  <v-container fluid>
    <div v-if="menuStore.activeTab === 'worldbuilding'">
      <h1>World Building</h1>
    </div>

    <div v-else-if="menuStore.activeTab === 'npcmanager'">
      <h1>NPC Manager</h1>
    </div>
  </v-container>
</template>
