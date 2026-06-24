<script setup>
import { ref } from "vue";
import CharCreator from "@/components/CharacterCreation/CharCreator.vue";

const addNPC = ref(false);
</script>

<template>
  <v-container fluid>
    <v-row class="justify-space-between align-center">
      <v-col cols="auto">
        <h1 class="text-h4">All NPCs</h1>
      </v-col>

      <v-col cols="auto">
        <v-dialog v-model="addNPC">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn color="primary" v-bind="activatorProps" rounded>+</v-btn>
          </template>
          <template v-slot:default>
            <CharCreator v-if="addNPC" @close="addNPC = false" />
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
