<script setup>
import { ref } from "vue";

const hasCharSheet = ref(false);
</script>

<template>
  <v-container fluid>
    <v-row no-gutters v-if="!hasCharSheet">
      <v-col> No character created for this campaign. </v-col>
      <v-col>
        <v-btn>Create new character</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters v-if="hasCharSheet"> </v-row>
  </v-container>
</template>
