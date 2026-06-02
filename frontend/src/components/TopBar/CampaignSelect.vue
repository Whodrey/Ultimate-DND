<script setup>
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCampaignStore } from "@/stores/campaignStore";
import {
  getCampaignRouteForCurrentRoute,
  getRouteCampaignId,
} from "@/utils/campaignRoutes";

const route = useRoute();
const router = useRouter();
const campaignStore = useCampaignStore();

// The selected campaign is always based on the URL
const selectedCampaignId = computed({
  get: () => getRouteCampaignId(route),
  set: (campaignId) => {
    if (!campaignId) {
      router.push({ name: "home" });
      return;
    }
    router.push(getCampaignRouteForCurrentRoute(route, campaignId));
  },
});

async function syncCampaignFromUrl() {
  const campaignId = getRouteCampaignId(route);
  if (campaignId) {
    try {
      await campaignStore.selectCampaign(campaignId);
    } catch (error) {
      console.error(error);
    }
  }
}

onMounted(async () => {
  await campaignStore.loadCampaigns();
  await syncCampaignFromUrl();
});

watch(
  () => getRouteCampaignId(route),
  (campaignId) => {
    if (campaignId) {
      syncCampaignFromUrl();
    }
  },
);
</script>

<template>
  <v-select
    class="campaign-select"
    v-model="selectedCampaignId"
    :items="campaignStore.campaigns"
    item-title="name"
    item-value="_id"
    density="compact"
    hide-details
  />
</template>

<style scoped>
.campaign-select {
  width: 260px;
  max-width: 32vw;
}
</style>
