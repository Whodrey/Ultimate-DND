<script setup>
import { watch, ref } from "vue";
import { useCharacterStore } from "@/stores/characterStore";

const props = defineProps({
  charType: {
    type: "string",
  },
});

const characterStore = useCharacterStore();
const charType = ref(["simpleNPC", "complexNPC", "NPCwCharSheet", "Player"]);
const selectedType = ref(null);
</script>

<template>
  <v-container fluid>
    <v-card color="surface" class="pa-5 d-flex flex-column">
      <v-card-title class="flex-shrink-0">
        <div class="character-card-title">
          <span>Add new character</span>
          <v-select
            class="character-type-select"
            density="compact"
            placeholder="Character Type"
            :items="charType"
            v-model="selectedType"
          />
        </div>
      </v-card-title>
      <v-card-text class="flex-grow-1 overflow-y-auto">
        <v-form v-if="selectedType" class="form-grid">
          <v-text-field label="Name" />
          <v-text-field label="Surname" />
          <v-number-input :min="0" label="Age" />
          <v-select
            label="Species"
            :items="characterStore.charOptions.species.options"
          />
          <v-number-input label="Level" :min="1" :max="20" />
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.character-card-title {
  display: grid;
  grid-template-columns: auto minmax(220px, 320px);
  gap: 16px;
  align-items: start;
}

.character-type-select {
  min-width: 0;
}

@media (max-width: 600px) {
  .character-card-title {
    grid-template-columns: 1fr;
  }
}
</style>
