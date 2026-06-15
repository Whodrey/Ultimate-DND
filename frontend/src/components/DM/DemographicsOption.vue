<script setup>
import { useCityStore } from "@/stores/cityStore";

const cityStore = useCityStore();
const maxValue = cityStore.maxDemographicsTotal;
const demographics = defineModel({ default: () => [] });

if (!demographics.value.length) {
  demographics.value = cityStore.createDefaultDemographics();
}

const setSpeciesValue = (speciesName, value) => {
  const parsedValue = Number(value || 0);
  const numberValue = Number.isFinite(parsedValue) ? parsedValue : 0;
  const totalExceptSpecies = demographics.value.reduce(
    (sum, currentSpecies) => {
      if (currentSpecies.name === speciesName) return sum;
      return sum + Number(currentSpecies.val || 0);
    },
    0,
  );
  const maxAllowed = Math.max(0, maxValue - totalExceptSpecies);
  const nextValue = Math.min(Math.max(numberValue, 0), maxAllowed);

  demographics.value = demographics.value.map((currentSpecies) =>
    currentSpecies.name === speciesName
      ? { ...currentSpecies, val: nextValue }
      : currentSpecies,
  );
};
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel color="surface">
      <v-expansion-panel-title> Demographics (in %) </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row
          class="justify-space-between"
          no-gutters
          v-for="species in demographics"
          :key="species.name"
        >
          <v-col cols="3">
            {{ species.name }}
          </v-col>
          <v-col cols="5">
            <v-slider
              :model-value="species.val"
              min="0"
              :max="maxValue"
              step="1"
              @update:model-value="setSpeciesValue(species.name, $event)"
            />
          </v-col>
          <v-col cols="3">
            <v-text-field
              :model-value="species.val"
              @update:model-value="setSpeciesValue(species.name, $event)"
              :max="maxValue"
              min="0"
              density="compact"
              type="number"
              hide-details
              single-line
            />
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
