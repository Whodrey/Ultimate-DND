<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useMenuStore } from "@/stores/menuStore";

const route = useRoute();
const menuStore = useMenuStore();

const currentTabs = computed(() => {
  if (route.name === "dm-dashboard") return menuStore.DMtabs;
  if (route.name === "player-dashboard") return menuStore.PlayerTabs;
  return [];
});

watch(
  currentTabs,
  (tabs) => {
    const tabExists = tabs.some((item) => item.value === menuStore.activeTab);

    if (!tabExists) {
      menuStore.activeTab = tabs[0]?.value ?? null;
    }
  },
  { immediate: true },
);
</script>

<template>
  <v-app-bar>
    <v-app-bar-title text="Ultimate DND" />

    <v-spacer />

    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/player">Player Dashboard</v-btn>
    <v-btn text to="/dm">DM Dashboard</v-btn>

    <template #extension v-if="currentTabs.length">
      <v-tabs v-model="menuStore.activeTab" align-tabs="title">
        <v-tab
          v-for="item in currentTabs"
          :key="item.value"
          :text="item.text"
          :value="item.value"
        />
      </v-tabs>
    </template>
  </v-app-bar>
</template>
