import { defineStore } from "pinia";
import { ref } from "vue";
import { useCampaignStore } from "./campaignStore";

const apiUrl = import.meta.env.VITE_BACKEND_URL ?? "/api";
const entityType = "city";

export const useCityStore = defineStore("city", () => {
  const cities = ref([]);
  const cityOptions = ref({
    name: {
      label: "City Name",
    },
    size: {
      label: "Size",
      options: ["Hamlet", "Village", "Town", "City", "Metropolis"],
    },
    population: {
      label: "Population",
    },
    vibe: {
      label: "Vibe",
      options: [
        "Bustling",
        "Quiet",
        "Dangerous",
        "Prosperous",
        "Corrupt",
        "Religious",
        "Magical",
        "Industrial",
        "Port",
        "Mining",
        "Farming",
      ],
    },
    demographics: {
      label: "Demographics",
    },
    description: {
      label: "Description",
    },
  });

  const speciesOptions = [
    "Aasimar",
    "Dragonborn",
    "Dwarf",
    "Elf",
    "Gnome",
    "Goliath",
    "Halfling",
    "Human",
    "Orc",
    "Tiefling",
  ];

  const maxDemographicsTotal = 100;

  function createDefaultDemographics() {
    return speciesOptions.map((name) => ({
      name,
      val: 0,
    }));
  }

  function getActiveCampaignId() {
    const campaignStore = useCampaignStore();

    if (!campaignStore.activeCampaignId) {
      throw new Error("Select a campaign before managing cities.");
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

    const response = await fetch(
      `${getEntityEndpoint(campaignId)}?type=${entityType}`,
    );
    const entities = await parseJsonResponse(response, "Could not load cities.");

    cities.value = entities.map(normalizeCityEntity);

    return cities.value;
  }

  async function addCity(cityData) {
    const campaignId = getActiveCampaignId();
    const response = await fetch(getEntityEndpoint(campaignId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCityPayload(cityData)),
    });
    const city = normalizeCityEntity(
      await parseJsonResponse(response, "Could not create city."),
    );

    cities.value.unshift(city);

    return city;
  }

  async function delCity(cityId) {
    const campaignId = getActiveCampaignId();
    const response = await fetch(
      getEntityEndpoint(campaignId, `/${encodeURIComponent(cityId)}`),
      {
        method: "DELETE",
      },
    );

    await parseJsonResponse(response, "Could not delete city.");

    cities.value = cities.value.filter((city) => city.id !== cityId);
  }

  async function updateCity(cityId, cityData) {
    const campaignId = getActiveCampaignId();
    const response = await fetch(
      getEntityEndpoint(campaignId, `/${encodeURIComponent(cityId)}`),
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createCityPayload(cityData)),
      },
    );
    const updatedCity = normalizeCityEntity(
      await parseJsonResponse(response, "Could not update city."),
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
