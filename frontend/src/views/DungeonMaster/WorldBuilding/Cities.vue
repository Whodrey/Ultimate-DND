<script setup>
import { useCityStore } from "@/stores/cityStore";
import { ref } from "vue";
import NewCity from "@/components/DM/NewCity.vue";

const cityStore = useCityStore();

const addCity = ref(false);
</script>

<template>
  <v-container fluid>
    <v-row class="justify-space-between align-center">
      <v-col cols="auto">
        <h1 class="text-h4">Cities</h1>
      </v-col>

      <v-col cols="auto">
        <v-dialog>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" rounded>+</v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <NewCity v-if="isActive" @close="addCity = false" />
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
