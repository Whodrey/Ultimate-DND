<script setup>
import { useCityStore } from "@/stores/cityStore";
import { computed, ref } from "vue";
import DemographicsOption from "./DemographicsOption.vue";

const cityStore = useCityStore();
const props = defineProps({
  city: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["close"]);

const isEditing = computed(() => Boolean(props.city?.id));

function createDemographics() {
  if (!Array.isArray(props.city?.demographics)) {
    return cityStore.createDefaultDemographics();
  }

  return props.city.demographics.map((species) => ({ ...species }));
}

const cityName = ref(props.city?.name ?? "");
const sizeSelect = ref(props.city?.size ?? null);
const population = ref(props.city?.population ?? null);
const vibeSelect = ref(
  Array.isArray(props.city?.vibe) ? [...props.city.vibe] : [],
);
const demographics = ref(createDemographics());
const description = ref(props.city?.description ?? "");
const isSaving = ref(false);

const formTitle = computed(() => {
  if (!isEditing.value) return "Add new city";

  const currentCityName = cityName.value.trim();
  return currentCityName ? `Edit ${currentCityName}` : "Edit city";
});

function resetForm() {
  cityName.value = "";
  sizeSelect.value = null;
  population.value = null;
  vibeSelect.value = [];
  demographics.value = cityStore.createDefaultDemographics();
  description.value = "";
}

async function saveCity() {
  if (isSaving.value) return;

  const cityData = {
    name: cityName.value,
    size: sizeSelect.value,
    population: population.value,
    vibe: vibeSelect.value,
    demographics: demographics.value,
    description: description.value,
  };

  try {
    isSaving.value = true;

    if (isEditing.value) {
      await cityStore.updateCity(props.city.id, cityData);
    } else {
      await cityStore.addCity(cityData);
    }

    resetForm();
    emit("close");
  } catch (error) {
    console.error(error);
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <v-container fluid class="pa-0">
    <v-card color="surface" class="new-city-card pa-5 d-flex flex-column">
      <v-card-title class="flex-shrink-0">
        {{ formTitle }}
      </v-card-title>
      <v-card-text class="new-city-card-text flex-grow-1 overflow-y-auto">
        <v-form class="form-grid" @submit.prevent="saveCity">
          <v-text-field
            v-model="cityName"
            :label="cityStore.cityOptions.name.label"
          />
          <v-select
            v-model="sizeSelect"
            :label="cityStore.cityOptions.size.label"
            :items="cityStore.cityOptions.size.options"
          />
          <v-text-field
            v-model="population"
            :label="cityStore.cityOptions.population.label"
            type="number"
          />
          <v-combobox
            v-model="vibeSelect"
            :items="cityStore.cityOptions.vibe.options"
            :label="cityStore.cityOptions.vibe.label"
            multiple
            chips
            clearable
          />
          <DemographicsOption v-model="demographics" />
          <v-textarea
            v-model="description"
            :label="cityStore.cityOptions.description.label"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="new-city-card-actions justify-end">
        <v-btn
          color="primary"
          variant="flat"
          rounded
          :loading="isSaving"
          :disabled="isSaving"
          @click="saveCity"
        >
          {{ isEditing ? "Save" : "Create" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.new-city-card {
  height: min(700px, calc(100vh - 96px));
}

.new-city-card-text {
  min-height: 0;
}

.new-city-card-actions {
  flex: 0 0 auto;
}
</style>
