<script setup>
import LocationForm from "@/components/DM/LocationForm.vue";
import { ref } from "vue";

const addLocation = ref(false);
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Locations</h1>
      </v-col>
      <v-col cols="auto">
        <v-dialog v-model="addLocation">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn color="primary" v-bind="activatorProps" rounded>+</v-btn>
          </template>
          <template v-slot:default>
            <LocationForm v-if="addLocation" @close="addLocation = false" />
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
