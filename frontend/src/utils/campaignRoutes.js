export function getRouteCampaignId(route) {
  const campaignId = route.params.campaignId;

  return Array.isArray(campaignId) ? campaignId[0] : campaignId;
}

export function getCampaignRouteForCurrentRoute(route, campaignId) {
  if (route.name === "campaign-dm-dashboard") {
    return {
      name: "campaign-dm-dashboard",
      params: { campaignId },
    };
  }

  if (route.name === "campaign-player-dashboard") {
    return {
      name: "campaign-player-dashboard",
      params: { campaignId },
    };
  }

  return {
    name: "campaign-home",
    params: { campaignId },
  };
}

export function getCampaignNavigationRoute(routeName, campaignId) {
  if (!campaignId) return { name: "home" };

  if (routeName === "dm-dashboard") {
    return {
      name: "campaign-dm-dashboard",
      params: { campaignId },
    };
  }

  if (routeName === "player-dashboard") {
    return {
      name: "campaign-player-dashboard",
      params: { campaignId },
    };
  }

  return {
    name: "campaign-home",
    params: { campaignId },
  };
}

export function isDmRoute(routeName) {
  return routeName === "campaign-dm-dashboard";
}

export function isPlayerRoute(routeName) {
  return routeName === "campaign-player-dashboard";
}
