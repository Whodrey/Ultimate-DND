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

const createDemographics = () => {
  if (!Array.isArray(props.city?.demographics)) {
    return cityStore.createDefaultDemographics();
  }

  return props.city.demographics.map((species) => ({ ...species }));
};

const cityName = ref(props.city?.name ?? "");
const sizeSelect = ref(props.city?.size ?? null);
const population = ref(props.city?.population ?? null);
const vibeSelect = ref(Array.isArray(props.city?.vibe) ? [...props.city.vibe] : []);
const demographics = ref(createDemographics());
const description = ref(props.city?.description ?? "");

const resetForm = () => {
  cityName.value = "";
  sizeSelect.value = null;
  population.value = null;
  vibeSelect.value = [];
  demographics.value = cityStore.createDefaultDemographics();
  description.value = "";
};

const saveCity = () => {
  const cityData = {
    name: cityName.value,
    size: sizeSelect.value,
    population: population.value,
    vibe: vibeSelect.value,
    demographics: demographics.value,
    description: description.value,
  };

  if (isEditing.value) {
    cityStore.updateCity(props.city.id, cityData);
  } else {
    cityStore.addCity(cityData);
  }

  resetForm();
  emit("close");
};
</script>

<template>
  <v-container fluid class="pa-0">
    <v-card color="surface" class="new-city-card pa-5 d-flex flex-column">
      <v-card-title class="flex-shrink-0">
        {{ isEditing ? "Edit city" : "Add new city" }}
      </v-card-title>
      <v-card-text class="new-city-card-text flex-grow-1 overflow-y-auto">
        <v-form @submit.prevent="saveCity">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="cityName" label="City Name" />
              <v-select
                v-model="sizeSelect"
                label="Size"
                :items="cityStore.cityOptions.size"
              />
              <v-text-field
                v-model="population"
                label="Population"
                type="number"
              />
              <v-combobox
                v-model="vibeSelect"
                :items="cityStore.cityOptions.vibe"
                label="Vibe"
                multiple
                chips
                clearable
              />
            </v-col>
            <v-col cols="12" md="4">
              <DemographicsOption v-model="demographics" />
            </v-col>
            <v-col cols="12" md="4">
              <v-textarea v-model="description" label="Description" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="new-city-card-actions justify-end">
        <v-btn color="primary" variant="flat" rounded @click="saveCity">
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
