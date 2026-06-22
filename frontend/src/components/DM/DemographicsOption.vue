<script setup>
import { useCityStore } from "@/stores/cityStore";

const cityStore = useCityStore();
const maxValue = cityStore.maxDemographicsTotal;
const demographics = defineModel({ default: () => [] });

if (!demographics.value.length) {
  demographics.value = cityStore.createDefaultDemographics();
}

function setSpeciesValue(speciesName, value) {
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
}
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel color="surface">
      <v-expansion-panel-title> Demographics (in %) </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div
          class="demographics-option-row"
          v-for="species in demographics"
          :key="species.name"
        >
          <div class="demographics-option-name">
            {{ species.name }}
          </div>
          <v-slider
            :model-value="species.val"
            min="0"
            :max="maxValue"
            step="1"
            hide-details
            @update:model-value="setSpeciesValue(species.name, $event)"
          />
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
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>
.demographics-option-row {
  display: grid;
  grid-template-columns: minmax(88px, 1fr) minmax(160px, 2fr) minmax(72px, 0.7fr);
  gap: 12px;
  align-items: center;
}

.demographics-option-row + .demographics-option-row {
  margin-top: 8px;
}

.demographics-option-name {
  min-width: 0;
}

@media (max-width: 600px) {
  .demographics-option-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
