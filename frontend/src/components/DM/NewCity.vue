<script setup>
import { useCityStore } from "@/stores/cityStore";
import { ref } from "vue";
import DemographicsOption from "./DemographicsOption.vue";

const cityStore = useCityStore();

const vibeSelect = ref(null);
const sizeSelect = ref(null);
</script>

<template>
  <v-container fluid class="pa-0">
    <v-card class="new-city-card pa-5 d-flex flex-column">
      <v-card-title class="flex-shrink-0"> Add new city </v-card-title>
      <v-card-text class="new-city-card-text flex-grow-1 overflow-y-auto">
        <v-form>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field label="City Name" required />
              <v-select
                v-model="sizeSelect"
                label="Size"
                :items="cityStore.cityOptions.size"
              />
              <v-text-field label="Population" type="number" />
              <v-combobox
                v-model="vibeSelect"
                :items="cityStore.cityOptions.vibe"
                item-title="name"
                label="Vibe"
                multiple
                chips
                clearable
              />
            </v-col>
            <v-col cols="12" md="4">
              <DemographicsOption />
            </v-col>
            <v-col cols="12" md="4">
              <v-textarea label="Description" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="new-city-card-actions justify-end">
        <v-btn color="primary" rounded> Create </v-btn>
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
