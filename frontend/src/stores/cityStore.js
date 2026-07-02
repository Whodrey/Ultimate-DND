import { defineStore } from "pinia";
import { ref } from "vue";
import {
  createEntity,
  deleteEntity,
  listEntities,
  updateEntity,
} from "@/api/entities";
import {
  cityOptions as cityOptionDefinitions,
  citySpeciesOptions,
  createDefaultDemographics,
  maxDemographicsTotal,
} from "@/options/worldbuilding/options/cityOptions";
import { useCampaignStore } from "./campaignStore";

const entityType = "city";

export const useCityStore = defineStore("city", () => {
  const cities = ref([]);
  const cityOptions = ref(cityOptionDefinitions);
  const speciesOptions = citySpeciesOptions;

  function getActiveCampaignId() {
    const campaignStore = useCampaignStore();

    if (!campaignStore.activeCampaignId) {
      throw new Error("Select a campaign before managing cities.");
    }

    return campaignStore.activeCampaignId;
  }

  function normalizePopulation(population) {
    if (population === null || population === undefined || population === "") {
      return null;
    }

    const numberValue = Number(population);
    if (!Number.isFinite(numberValue)) return null;

    return Math.max(0, Math.floor(numberValue));
  }

  function normalizeDemographics(demographics = []) {
    const demographicsByName = new Map(
      (Array.isArray(demographics) ? demographics : []).map((species) => [
        species.name,
        Math.min(maxDemographicsTotal, Math.max(0, Number(species.val || 0))),
      ]),
    );

    return speciesOptions.map((name) => ({
      name,
      val: demographicsByName.get(name) ?? 0,
    }));
  }

  function normalizeCity(cityData = {}) {
    return {
      id: cityData.id ?? cityData._id ?? null,
      name:
        typeof cityData.name === "string" ? cityData.name.trim() : "",
      size: cityData.size ?? null,
      population: normalizePopulation(cityData.population),
      vibe: Array.isArray(cityData.vibe) ? [...cityData.vibe] : [],
      demographics: normalizeDemographics(cityData.demographics),
      description:
        typeof cityData.description === "string"
          ? cityData.description.trim()
          : "",
      createdAt: cityData.createdAt ?? new Date().toISOString(),
      updatedAt: cityData.updatedAt,
    };
  }

  function normalizeCityEntity(entity) {
    const details = entity.details ?? {};

    return normalizeCity({
      id: entity.id ?? entity._id,
      name: entity.name,
      size: details.size,
      population: details.population,
      vibe: details.vibe,
      demographics: details.demographics,
      description: details.description ?? entity.summary,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  function createCityPayload(cityData) {
    const city = normalizeCity(cityData);

    return {
      type: entityType,
      name: city.name,
      summary: city.description,
      details: {
        size: city.size,
        population: city.population,
        vibe: city.vibe,
        demographics: city.demographics,
        description: city.description,
      },
    };
  }

  async function loadCities(campaignId = useCampaignStore().activeCampaignId) {
    if (!campaignId) {
      cities.value = [];
      return cities.value;
    }

    const entities = await listEntities(
      campaignId,
      entityType,
      "Could not load cities.",
    );

    cities.value = entities.map(normalizeCityEntity);

    return cities.value;
  }

  async function addCity(cityData) {
    const campaignId = getActiveCampaignId();
    const city = normalizeCityEntity(
      await createEntity(
        campaignId,
        createCityPayload(cityData),
        "Could not create city.",
      ),
    );

    cities.value.unshift(city);

    return city;
  }

  async function delCity(cityId) {
    const campaignId = getActiveCampaignId();

    await deleteEntity(campaignId, cityId, "Could not delete city.");

    cities.value = cities.value.filter((city) => city.id !== cityId);
  }

  async function updateCity(cityId, cityData) {
    const campaignId = getActiveCampaignId();
    const updatedCity = normalizeCityEntity(
      await updateEntity(
        campaignId,
        cityId,
        createCityPayload(cityData),
        "Could not update city.",
      ),
    );
    const cityIndex = cities.value.findIndex((city) => city.id === cityId);

    if (cityIndex === -1) {
      cities.value.unshift(updatedCity);
      return updatedCity;
    }

    cities.value[cityIndex] = updatedCity;

    return updatedCity;
  }

  return {
    cities,
    cityOptions,
    speciesOptions,
    maxDemographicsTotal,
    createDefaultDemographics,
    loadCities,
    addCity,
    delCity,
    updateCity,
  };
});
