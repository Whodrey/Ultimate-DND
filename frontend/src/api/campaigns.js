import { apiRequest } from "./http";

function getCampaignPath(campaignId) {
  return `/campaigns/${encodeURIComponent(campaignId)}`;
}

export function listCampaigns() {
  return apiRequest("/campaigns", {
    fallbackMessage: "Could not load campaigns.",
  });
}

export function getCampaign(campaignId) {
  return apiRequest(getCampaignPath(campaignId), {
    fallbackMessage: "Could not load campaign.",
  });
}

export function createCampaign(
  campaignData,
  fallbackMessage = "Could not create campaign.",
) {
  return apiRequest("/campaigns", {
    method: "POST",
    body: campaignData,
    fallbackMessage,
  });
}
