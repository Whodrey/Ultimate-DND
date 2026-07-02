import { defineStore } from "pinia";
import { ref } from "vue";
import {
  createCampaign as createCampaignRequest,
  getCampaign,
  listCampaigns,
} from "@/api/campaigns";

export const useCampaignStore = defineStore(
  "campaign",
  () => {
    const campaigns = ref([]);
    const activeCampaignId = ref(null);
    const activeCampaign = ref(null);

    async function loadCampaigns() {
      campaigns.value = await listCampaigns();
    }

    async function selectCampaign(campaignId) {
      if (!campaignId) {
        activeCampaignId.value = null;
        activeCampaign.value = null;
        return null;
      }

      activeCampaign.value = await getCampaign(campaignId);
      activeCampaignId.value =
        activeCampaign.value._id || activeCampaign.value.id;

      return activeCampaign.value;
    }

    async function createCampaign(campaignData) {
      const campaign = await createCampaignRequest(campaignData);
      campaigns.value.unshift(campaign);

      return campaign;
    }

    return {
      campaigns,
      activeCampaignId,
      activeCampaign,
      loadCampaigns,
      selectCampaign,
      createCampaign,
    };
  },
  {
    persist: true,
  },
);
