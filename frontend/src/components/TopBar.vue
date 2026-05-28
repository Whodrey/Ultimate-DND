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

const activeTopTab = computed(() => {
  return currentTabs.value.find((item) => item.value === activeTab.value);
});

const currentSubtabs = computed(() => {
  return activeTopTab.value?.subtabs ?? [];
});

const activeSubtab = computed({
  get() {
    const firstSubtab = currentSubtabs.value[0]?.value;

    if (!activeTab.value || !firstSubtab) return null;

    if (route.name === "dm-dashboard") {
      return menuStore.activeDMSubtabs[activeTab.value] ?? firstSubtab;
    }

    if (route.name === "player-dashboard") {
      return menuStore.activePlayerSubtabs[activeTab.value] ?? firstSubtab;
    }

    return null;
  },

  set(value) {
    const isValidSubtab = currentSubtabs.value.some(
      (item) => item.value === value,
    );

    if (!activeTab.value || !isValidSubtab) return;

    if (route.name === "dm-dashboard") {
      menuStore.activeDMSubtabs[activeTab.value] = value;
    }

    if (route.name === "player-dashboard") {
      menuStore.activePlayerSubtabs[activeTab.value] = value;
    }
  },
});
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-toolbar>
        <v-toolbar-title text="Ultimate DND" />

        <v-col>Campaign: </v-col>

        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/player">Player Dashboard</v-btn>
        <v-btn text to="/dm">DM Dashboard</v-btn>
      </v-toolbar>
    </v-row>

    <v-container fluid class="pa-0 align-self-start">
      <v-row no-gutters>
        <v-col cols="12" v-if="currentTabs.length">
          <v-tabs v-model="activeTab" align-tabs="title">
            <v-tab
              v-for="item in currentTabs"
              :key="item.value"
              :text="item.title ?? item.text"
              :value="item.value"
            />
          </v-tabs>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" v-if="currentSubtabs.length">
          <v-tabs v-model="activeSubtab" align-tabs="title">
            <v-tab
              v-for="item in currentSubtabs"
              :key="item.value"
              :text="item.title ?? item.text"
              :value="item.value"
            />
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
