<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useMenuStore } from "@/stores/menuStore";

const route = useRoute();
const menuStore = useMenuStore();

const currentTabs = computed(() => {
  if (route.name === "dm-dashboard") return menuStore.DMtabs;
  if (route.name === "player-dashboard") return menuStore.PlayerTabs;
  return [];
});

const activeTab = computed({
  get() {
    if (route.name === "dm-dashboard") return menuStore.activeDMTab;
    if (route.name === "player-dashboard") return menuStore.activePlayerTab;
    return null;
  },

  set(value) {
    const isValidTab = currentTabs.value.some((item) => item.value === value);

    if (!isValidTab) return;

    if (route.name === "dm-dashboard") menuStore.activeDMTab = value;
    if (route.name === "player-dashboard") menuStore.activePlayerTab = value;
  },
});
</script>

<template>
  <v-container fluid>
    <v-app-bar height="100">
      <v-app-bar-title text="Ultimate DND" />

      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/player">Player Dashboard</v-btn>
      <v-btn text to="/dm">DM Dashboard</v-btn>

      <template>
        <v-row size="12">
          <v-col cols="auto"> Campaigns: </v-col>
          <v-col cols="auto"> </v-col>
        </v-row>
      </template>

      <template #extension v-if="currentTabs.length">
        <v-tabs v-model="activeTab" align-tabs="title">
          <v-tab
            v-for="item in currentTabs"
            :key="item.value"
            :text="item.text"
            :value="item.value"
          />
        </v-tabs>
      </template>
    </v-app-bar>
  </v-container>
</template>
