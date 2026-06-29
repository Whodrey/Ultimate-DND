import { defineStore } from "pinia";
import { ref } from "vue";
import { useCampaignStore } from "./campaignStore";

const apiUrl = import.meta.env.VITE_BACKEND_URL ?? "/api";
const entityType = "location";

export const useLocationStore = defineStore("location", () => {
  const locations = ref([]);
  const locationOptions = ref({
    name: {
      label: "Name",
    },
    type: {
      label: "Type",
      options: [
        { label: "Dungeon", value: "dungeon" },
        { label: "Camp", value: "camp" },
        { label: "Grotto", value: "grotto" },
        { label: "Mine", value: "mine" },
      ],
    },
    danger: {
      label: "Danger level",
      options: {
        0: "Safe even at night",
        1: "Safe",
        2: "Stay vigilant",
        3: "Danger close",
        4: "Trapped",
        5: "Attack on sight",
      },
    },
    description: {
      label: "Description",
    },
    state: {
      label: "State",
      options: {
        0: "Destroyed",
        1: "Abandonned",
        2: "In good condition",
        3: "Recent traces",
        4: "Inhabited but no one there right now",
        5: "Actively inhabited",
      },
    },
  });

  function getActiveCampaignId() {
    const campaignStore = useCampaignStore();

    if (!campaignStore.activeCampaignId) {
      throw new Error("Select a campaign before managing locations.");
    }

    return campaignStore.activeCampaignId;
  }

  function getEntityEndpoint(campaignId, suffix = "") {
    return `${apiUrl}/campaigns/${encodeURIComponent(
      campaignId,
    )}/entities${suffix}`;
  }

  async function parseJsonResponse(response, fallbackMessage) {
    const data = response.status === 204 ? null : await response.json();

    if (!response.ok) {
      throw new Error(data?.message ?? fallbackMessage);
    }

    return data;
  }

  function normalizeSliderOption(fieldKey, value) {
    const optionValues = Object.keys(locationOptions.value[fieldKey].options);
    const defaultValue = Number(optionValues[0] ?? 0);
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) return defaultValue;

    return optionValues.includes(String(numberValue))
      ? numberValue
      : defaultValue;
  }

  function normalizeLocation(locationData = {}) {
    return {
      id: locationData.id ?? locationData._id ?? null,
      name:
        typeof locationData.name === "string" ? locationData.name.trim() : "",
      type: locationData.type ?? null,
      danger: normalizeSliderOption("danger", locationData.danger),
      description:
        typeof locationData.description === "string"
          ? locationData.description.trim()
          : "",
      state: normalizeSliderOption("state", locationData.state),
      createdAt: locationData.createdAt ?? new Date().toISOString(),
      updatedAt: locationData.updatedAt,
    };
  }

  function normalizeLocationEntity(entity) {
    const details = entity.details ?? {};

    return normalizeLocation({
      id: entity.id ?? entity._id,
      name: entity.name,
      type: details.locationType ?? details.type,
      danger: details.danger,
      description: details.description ?? entity.summary,
      state: details.state,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  function createLocationPayload(locationData) {
    const location = normalizeLocation(locationData);

    return {
      type: entityType,
      name: location.name,
      summary: location.description,
      details: {
        locationType: location.type,
        danger: location.danger,
        description: location.description,
        state: location.state,
      },
    };
  }

  async function loadLocations(
    campaignId = useCampaignStore().activeCampaignId,
  ) {
    if (!campaignId) {
      locations.value = [];
      return locations.value;
    }

    const response = await fetch(
      `${getEntityEndpoint(campaignId)}?type=${entityType}`,
    );
    const entities = await parseJsonResponse(
      response,
      "Could not load locations.",
    );

    locations.value = entities.map(normalizeLocationEntity);

    return locations.value;
  }

  async function addLocation(locationData) {
    const campaignId = getActiveCampaignId();
    const response = await fetch(getEntityEndpoint(campaignId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createLocationPayload(locationData)),
    });
    const location = normalizeLocationEntity(
      await parseJsonResponse(response, "Could not create location."),
    );

    locations.value.unshift(location);

    return location;
  }

  async function delLocation(locationId) {
    const campaignId = getActiveCampaignId();
    const response = await fetch(
      getEntityEndpoint(campaignId, `/${encodeURIComponent(locationId)}`),
      {
        method: "DELETE",
      },
    );

    await parseJsonResponse(response, "Could not delete location.");

    locations.value = locations.value.filter(
      (location) => location.id !== locationId,
    );
  }

  async function updateLocation(locationId, locationData) {
    const campaignId = getActiveCampaignId();
    const response = await fetch(
      getEntityEndpoint(campaignId, `/${encodeURIComponent(locationId)}`),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createLocationPayload(locationData)),
      },
    );
    const updatedLocation = normalizeLocationEntity(
      await parseJsonResponse(response, "Could not update location."),
    );
    const locationIndex = locations.value.findIndex(
      (location) => location.id === locationId,
    );

    if (locationIndex === -1) {
      locations.value.unshift(updatedLocation);
      return updatedLocation;
    }

    locations.value[locationIndex] = updatedLocation;

    return updatedLocation;
  }

  return {
    locations,
    locationOptions,
    loadLocations,
    addLocation,
    delLocation,
    updateLocation,
  };
});
