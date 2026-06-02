<script setup>
import { useCityStore } from "@/stores/cityStore";
import { ref } from "vue";

const cityStore = useCityStore();
const maxValue = ref(100);
const demographics = ref([
  { name: "Aasimar", value: 10 },
  { name: "Dragonborn", value: 10 },
  { name: "Dwarf", value: 10 },
  { name: "Elf", value: 10 },
  { name: "Gnome", value: 10 },
  { name: "Goliath", value: 10 },
  { name: "Halfling", value: 10 },
  { name: "Human", value: 10 },
  { name: "Orc", value: 10 },
  { name: "Tiefling", value: 10 },
]);
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title> Demographics </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row v-for="species in demographics" :key="species.name">
          {{ species.name }}
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
