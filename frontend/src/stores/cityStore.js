import { defineStore } from "pinia";
import { ref } from "vue";

export const useCityStore = defineStore(
  "city",
  () => {
    const cities = ref([]);
    const cityOptions = ref({
      size: ["Hamlet", "Village", "Town", "City", "Metropolis"],
      vibe: [
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
    });

    function loadCities() {}

    function addCity(cityData) {}

    function delCity(cityId) {}

    function updateCity(cityId, cityData) {}

    return {
      cities,
      cityOptions,
      loadCities,
      addCity,
      delCity,
      updateCity,
    };
  },
  {
    persist: true,
  },
);
