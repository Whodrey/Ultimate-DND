import { defineStore } from "pinia";
import { ref } from "vue";

export const useCityStore = defineStore(
  "city",
  () => {
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

    function createCityId() {
      if (globalThis.crypto?.randomUUID) {
        return globalThis.crypto.randomUUID();
      }

      return `city-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }

    function normalizePopulation(population) {
      if (
        population === null ||
        population === undefined ||
        population === ""
      ) {
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

    function normalizeCity(cityData) {
      return {
        id: cityData.id ?? createCityId(),
        name: cityData.name?.trim() ?? "",
        size: cityData.size ?? null,
        population: normalizePopulation(cityData.population),
        vibe: Array.isArray(cityData.vibe) ? [...cityData.vibe] : [],
        demographics: normalizeDemographics(cityData.demographics),
        description: cityData.description?.trim() ?? "",
        createdAt: cityData.createdAt ?? new Date().toISOString(),
      };
    }

    function loadCities() {
      return cities.value;
    }

    function addCity(cityData) {
      const city = normalizeCity(cityData);
      cities.value.unshift(city);

      return city;
    }

    function delCity(cityId) {
      cities.value = cities.value.filter((city) => city.id !== cityId);
    }

    function updateCity(cityId, cityData) {
      const cityIndex = cities.value.findIndex((city) => city.id === cityId);

      if (cityIndex === -1) return null;

      const updatedCity = normalizeCity({
        ...cities.value[cityIndex],
        ...cityData,
        id: cities.value[cityIndex].id,
        createdAt: cities.value[cityIndex].createdAt,
      });

      cities.value[cityIndex] = {
        ...updatedCity,
        updatedAt: new Date().toISOString(),
      };

      return cities.value[cityIndex];
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
  },
  {
    persist: {
      pick: ["cities"],
    },
  },
);
