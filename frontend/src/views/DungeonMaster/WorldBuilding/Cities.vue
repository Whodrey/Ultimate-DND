<script setup>
import { useCityStore } from "@/stores/cityStore";
import { computed, ref } from "vue";
import CityForm from "@/components/DM/CityForm.vue";

const cityStore = useCityStore();

const addCity = ref(false);
const editCity = ref(false);
const selectedCity = ref(null);

const cityTableHeaders = [
  { title: "Name", key: "name" },
  { title: "Size", key: "sizeDisplay" },
  { title: "Population", key: "populationDisplay", align: "end" },
  { title: "Vibe", key: "vibeDisplay", sortable: false },
  { title: "Demographics", key: "demographicsDisplay", sortable: false },
  { title: "Description", key: "descriptionDisplay" },
  { title: "", key: "actions", sortable: false, align: "end" },
];

const numberFormatter = new Intl.NumberFormat();

const formatPopulation = (population) => {
  if (population === null || population === undefined) return "Unspecified";

  return numberFormatter.format(population);
};

const formatVibe = (vibe) => {
  if (!Array.isArray(vibe) || !vibe.length) return "Unspecified";

  return vibe.join(", ");
};

const formatDemographics = (demographics) => {
  if (!Array.isArray(demographics)) return "Unspecified";

  const selectedDemographics = demographics
    .filter((species) => Number(species.val) > 0)
    .sort((firstSpecies, secondSpecies) => secondSpecies.val - firstSpecies.val)
    .slice(0, 3);

  if (!selectedDemographics.length) return "Unspecified";

  return selectedDemographics
    .map((species) => `${species.name} ${species.val}%`)
    .join(", ");
};

const cityRows = computed(() =>
  cityStore.cities.map((city) => ({
    ...city,
    sizeDisplay: city.size ?? "Unspecified",
    populationDisplay: formatPopulation(city.population),
    vibeDisplay: formatVibe(city.vibe),
    demographicsDisplay: formatDemographics(city.demographics),
    descriptionDisplay: city.description || "No description",
  })),
);

const openEditCity = (city) => {
  selectedCity.value = city;
  editCity.value = true;
};

const closeEditCity = () => {
  editCity.value = false;
  selectedCity.value = null;
};
</script>

<template>
  <v-container fluid>
    <v-row class="justify-space-between align-center">
      <v-col cols="auto">
        <h1 class="text-h4">Cities</h1>
      </v-col>

      <v-col cols="auto">
        <v-dialog v-model="addCity">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn color="primary" v-bind="activatorProps" rounded>+</v-btn>
          </template>
          <template v-slot:default>
            <CityForm v-if="addCity" @close="addCity = false" />
          </template>
        </v-dialog>
      </v-col>
    </v-row>

    <v-card color="surface" class="mt-4">
      <v-data-table
        :headers="cityTableHeaders"
        :items="cityRows"
        item-value="id"
        density="comfortable"
        :items-per-page="10"
      >
        <template v-slot:item.actions="{ item }">
          <v-menu>
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                icon="mdi-dots-vertical"
                variant="text"
                size="small"
              />
            </template>

            <v-list density="compact">
              <v-list-item @click="openEditCity(item)">
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <template v-slot:no-data>
          <div class="pa-6 text-medium-emphasis">No cities created yet.</div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="editCity">
      <CityForm
        v-if="editCity && selectedCity"
        :city="selectedCity"
        @close="closeEditCity"
      />
    </v-dialog>
  </v-container>
</template>
