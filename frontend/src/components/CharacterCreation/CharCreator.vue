<script setup>
import { useCharacterCreationForm } from "@/composables/useCharacterCreationForm";
import Skills from "./Skills.vue";
import BaseAbilities from "./BaseAbilities.vue";
import Spells from "./Spells.vue";
import { useNpcStore } from "@/stores/npcStore.js";

const npcStore = useNpcStore();

function addNewChar(charType) {
  try {
    npcStore.addNpc(characterStore.newChar);
  } catch (error) {
    console.log(error);
  }
}

const {
  characterStore,
  step,
  stepItems,
  showCharacterBuildFields,
  fieldOptions,
  selectSpecies,
  selectSubspecies,
  selectBackground,
  subclassOptions,
  selectClass,
  selectSubclass,
} = useCharacterCreationForm();
</script>

<template>
  <v-container fluid>
    <v-card color="surface" class="pa-5 d-flex flex-column">
      <v-card-title class="flex-shrink-0">
        <div class="character-card-title">
          <span>Add new character</span>
          <v-select
            density="compact"
            placeholder="Character Type"
            :items="characterStore.charType"
            item-title="title"
            item-value="value"
            v-model="characterStore.selectedType"
          />
        </div>
      </v-card-title>
      <v-card-text class="flex-grow-1 overflow-y-auto">
        <v-form v-if="characterStore.selectedType">
          <v-stepper flat v-model="step" :items="stepItems">
            <template #item.1>
              <div class="form-grid">
                <v-text-field label="Name" />
                <v-text-field label="Surname" />
                <v-number-input :min="0" label="Age" />
                <v-select
                  :model-value="characterStore.newChar.species"
                  label="Species"
                  :items="fieldOptions.species"
                  item-title="title"
                  item-value="value"
                  @update:model-value="selectSpecies"
                />
                <v-select
                  v-if="fieldOptions.subspecies"
                  :model-value="characterStore.newChar.subspecies"
                  label="Subspecies"
                  :items="fieldOptions.subspecies"
                  @update:model-value="selectSubspecies"
                />
                <template v-if="showCharacterBuildFields">
                  <v-select
                    :model-value="characterStore.newChar.background"
                    label="Background"
                    :items="fieldOptions.backgrounds"
                    item-title="title"
                    item-value="value"
                    @update:model-value="selectBackground"
                  />
                  <v-number-input
                    v-model="characterStore.newChar.level"
                    label="Level"
                    :min="1"
                    :max="20"
                  />
                  <v-select
                    :model-value="characterStore.newChar.class"
                    label="Class"
                    :items="fieldOptions.classes"
                    @update:model-value="selectClass"
                  />
                  <v-select
                    v-if="subclassOptions && characterStore.newChar.class"
                    :model-value="characterStore.newChar.subclass"
                    label="Subclass"
                    :items="subclassOptions"
                    @update:model-value="selectSubclass"
                  />
                </template>
              </div>
            </template>
            <template #item.2>
              <BaseAbilities />
            </template>

            <template #item.3>
              <Skills />
            </template>

            <template #item.4>
              <Spells />
            </template>
          </v-stepper>
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
