<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMenuStore } from "@/stores/menuStore";
import { isDmRoute, isPlayerRoute } from "@/utils/campaignRoutes";

const route = useRoute();
const router = useRouter();
const menuStore = useMenuStore();

const currentTabs = computed(() => {
  if (isDmRoute(route.name)) return menuStore.DMtabs;
  if (isPlayerRoute(route.name)) return menuStore.PlayerTabs;

  return [];
});

const activeTab = computed(() => {
  // First check URL query params, then fall back to store
  const urlTab = route.query.tab;
  if (urlTab) return urlTab;

  if (isDmRoute(route.name)) return menuStore.activeDMTab;
  if (isPlayerRoute(route.name)) return menuStore.activePlayerTab;

  return null;
});

function handleTabChange(value) {
  console.log("Tab change triggered:", value, "Route name:", route.name);
  const isValidTab = currentTabs.value.some((item) => item.value === value);
  if (!isValidTab) {
    console.log("Invalid tab");
    return;
  }

  // Update store
  if (isDmRoute(route.name)) {
    menuStore.activeDMTab = value;
  } else if (isPlayerRoute(route.name)) {
    menuStore.activePlayerTab = value;
  }

  // Update URL
  console.log("Pushing router with:", {
    path: route.path,
    query: { ...route.query, tab: value, subtab: undefined },
  });

  router.push({
    path: route.path,
    query: { ...route.query, tab: value, subtab: undefined },
  });
}

const activeTopTab = computed(() => {
  return currentTabs.value.find((item) => item.value === activeTab.value);
});

const currentSubtabs = computed(() => {
  return activeTopTab.value?.subtabs ?? [];
});

const activeSubtab = computed(() => {
  const firstSubtab = currentSubtabs.value[0]?.value;

  if (!activeTab.value || !firstSubtab) return null;

  // First check URL query params, then fall back to store
  const urlSubtab = route.query.subtab;
  if (urlSubtab && currentSubtabs.value.some((s) => s.value === urlSubtab)) {
    return urlSubtab;
  }

  if (isDmRoute(route.name)) {
    return menuStore.activeDMSubtabs[activeTab.value] ?? firstSubtab;
  }

  if (isPlayerRoute(route.name)) {
    return menuStore.activePlayerSubtabs[activeTab.value] ?? firstSubtab;
  }

  return null;
});

function handleSubtabChange(value) {
  const isValidSubtab = currentSubtabs.value.some(
    (item) => item.value === value,
  );

  if (!activeTab.value || !isValidSubtab) return;

  // Update store
  if (isDmRoute(route.name)) {
    menuStore.activeDMSubtabs[activeTab.value] = value;
  } else if (isPlayerRoute(route.name)) {
    menuStore.activePlayerSubtabs[activeTab.value] = value;
  }

  // Update URL
  router.push({
    path: route.path,
    query: { ...route.query, tab: activeTab.value, subtab: value },
  });
}

// Sync from URL on mount
onMounted(() => {
  if (route.query.tab) {
    if (isDmRoute(route.name)) {
      menuStore.activeDMTab = route.query.tab;
    } else if (isPlayerRoute(route.name)) {
      menuStore.activePlayerTab = route.query.tab;
    }
  }
  if (route.query.subtab && route.query.tab) {
    if (isDmRoute(route.name)) {
      menuStore.activeDMSubtabs[route.query.tab] = route.query.subtab;
    } else if (isPlayerRoute(route.name)) {
      menuStore.activePlayerSubtabs[route.query.tab] = route.query.subtab;
    }
  }
});
</script>

<template>
  <v-container fluid class="py-0">
    <v-row no-gutters class="justify-space-between align-center">
      <v-col cols="auto" class="tab-slot">
        <v-tabs
          :model-value="activeTab"
          class="tab-bar"
          :class="{ 'tab-bar-hidden': !currentTabs.length }"
          color="secondary"
        >
          <v-tab
            v-for="item in currentTabs"
            :key="item.value"
            :text="item.title ?? item.text"
            :value="item.value"
            @click="handleTabChange(item.value)"
          />
        </v-tabs>
      </v-col>
      <v-col cols="auto"> Share </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="tab-slot">
        <v-tabs
          :model-value="activeSubtab"
          class="tab-bar"
          :class="{ 'tab-bar-hidden': !currentSubtabs.length }"
          color="tertiary"
        >
          <v-tab
            v-for="item in currentSubtabs"
            :key="item.value"
            :text="item.title ?? item.text"
            :value="item.value"
            @click="handleSubtabChange(item.value)"
          />
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.tab-slot {
  height: 48px;
  min-height: 48px;
}

.tab-bar {
  height: 48px;
}

.tab-bar-hidden {
  visibility: hidden;
}
</style>
