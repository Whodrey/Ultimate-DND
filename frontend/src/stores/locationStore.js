import { defineStore } from "pinia";
import { ref } from "vue";

export const useLocationStore = defineStore(
  "location",
  () => {
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

    function createLocationId() {
      if (globalThis.crypto?.randomUUID) {
        return globalThis.crypto.randomUUID();
      }

      return `location-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
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

    function normalizeLocation(locationData) {
      return {
        id: locationData.id ?? createLocationId(),
        name: locationData.name?.trim() ?? "",
        type: locationData.type ?? null,
        danger: normalizeSliderOption("danger", locationData.danger),
        description: locationData.description?.trim() ?? "",
        state: normalizeSliderOption("state", locationData.state),
        createdAt: locationData.createdAt ?? new Date().toISOString(),
      };
    }

    function loadLocations() {
      return locations.value;
    }

    function addLocation(locationData) {
      const location = normalizeLocation(locationData);
      locations.value.unshift(location);

      return location;
    }

    function delLocation(locationId) {
      locations.value = locations.value.filter(
        (location) => location.id !== locationId,
      );
    }

    function updateLocation(locationId, locationData) {
      const locationIndex = locations.value.findIndex(
        (location) => location.id === locationId,
      );

      if (locationIndex === -1) return null;

      const updatedLocation = normalizeLocation({
        ...locations.value[locationIndex],
        ...locationData,
        id: locations.value[locationIndex].id,
        createdAt: locations.value[locationIndex].createdAt,
      });

      locations.value[locationIndex] = {
        ...updatedLocation,
        updatedAt: new Date().toISOString(),
      };

      return locations.value[locationIndex];
    }

    return {
      locations,
      locationOptions,
      loadLocations,
      addLocation,
      delLocation,
      updateLocation,
    };
  },
  {
    persist: {
      pick: ["locations"],
    },
  },
);
