import { defineStore } from "pinia";
import { ref } from "vue";
import {
  createEntity,
  deleteEntity,
  listEntities,
  updateEntity,
} from "@/api/entities";
import { locationOptions as locationOptionDefinitions } from "@/options/worldbuilding/options/locationOptions";
import { useCampaignStore } from "./campaignStore";

const entityType = "location";

export const useLocationStore = defineStore("location", () => {
  const locations = ref([]);
  const locationOptions = ref(locationOptionDefinitions);

  function getActiveCampaignId() {
    const campaignStore = useCampaignStore();

    if (!campaignStore.activeCampaignId) {
      throw new Error("Select a campaign before managing locations.");
    }

    return campaignStore.activeCampaignId;
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

    const entities = await listEntities(
      campaignId,
      entityType,
      "Could not load locations.",
    );

    locations.value = entities.map(normalizeLocationEntity);

    return locations.value;
  }

  async function addLocation(locationData) {
    const campaignId = getActiveCampaignId();
    const location = normalizeLocationEntity(
      await createEntity(
        campaignId,
        createLocationPayload(locationData),
        "Could not create location.",
      ),
    );

    locations.value.unshift(location);

    return location;
  }

  async function delLocation(locationId) {
    const campaignId = getActiveCampaignId();

    await deleteEntity(campaignId, locationId, "Could not delete location.");

    locations.value = locations.value.filter(
      (location) => location.id !== locationId,
    );
  }

  async function updateLocation(locationId, locationData) {
    const campaignId = getActiveCampaignId();
    const updatedLocation = normalizeLocationEntity(
      await updateEntity(
        campaignId,
        locationId,
        createLocationPayload(locationData),
        "Could not update location.",
      ),
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
