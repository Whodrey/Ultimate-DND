import { defineStore } from "pinia";
import { ref } from "vue";

const apiUrl = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

export const useCampaignStore = defineStore(
  "campaign",
  () => {
    const campaigns = ref([]);
    const activeCampaignId = ref(null);
    const activeCampaign = ref(null);

    async function loadCampaigns() {
      const response = await fetch(`${apiUrl}/campaigns`);

      if (!response.ok) {
        throw new Error("Could not load campaigns.");
      }

      campaigns.value = await response.json();
    }

    async function selectCampaign(campaignId) {
      if (!campaignId) {
        activeCampaignId.value = null;
        activeCampaign.value = null;
        return null;
      }

      const response = await fetch(
        `${apiUrl}/campaigns/${encodeURIComponent(campaignId)}`,
      );

      if (!response.ok) {
        throw new Error("Could not load campaign.");
      }

      activeCampaign.value = await response.json();
      activeCampaignId.value =
        activeCampaign.value._id || activeCampaign.value.id;

      return activeCampaign.value;
    }

    async function createCampaign(campaignData) {
      const response = await fetch(`${apiUrl}/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignData),
      });

      const campaign = await response.json();

      if (!response.ok) {
        throw new Error(campaign.message ?? "Could not create campaign.");
      }

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
