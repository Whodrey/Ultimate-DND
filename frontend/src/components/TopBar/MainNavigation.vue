<script setup>
import { computed } from "vue";
import { useCampaignStore } from "@/stores/campaignStore";
import { getCampaignNavigationRoute } from "@/utils/campaignRoutes";

const campaignStore = useCampaignStore();
const hasActiveCampaign = computed(() => Boolean(campaignStore.activeCampaignId));

function getNavigationRoute(routeName) {
  return getCampaignNavigationRoute(routeName, campaignStore.activeCampaignId);
}
</script>

<template>
  <v-btn text :to="getNavigationRoute('home')">Home</v-btn>
  <v-btn
    text
    :to="getNavigationRoute('player-dashboard')"
    :disabled="!hasActiveCampaign"
  >
    Player Dashboard
  </v-btn>
  <v-btn
    text
    :to="getNavigationRoute('dm-dashboard')"
    :disabled="!hasActiveCampaign"
  >
    DM Dashboard
  </v-btn>
</template>
