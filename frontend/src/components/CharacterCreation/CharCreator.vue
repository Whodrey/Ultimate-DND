<script setup>
import { ref, computed } from "vue";
import { useCharacterStore } from "@/stores/characterStore";
import Skills from "./Skills.vue";
import BaseAbilities from "./BaseAbilities.vue";
import Spells from "./Spells.vue";

const props = defineProps({
  charType: {
    type: "string",
  },
});

const characterStore = useCharacterStore();
const charType = ref(["simpleNPC", "complexNPC", "NPCwCharSheet", "Player"]);
const selectedType = ref(null);

// v-stepper
const step = ref(1);
const steps = [
  { value: 1, title: "Identity" },
  { value: 2, title: "Base abilities" },
  { value: 3, title: "Skills" },
  { value: 4, title: "Spells" },
];

const speciesOptions = computed(() =>
  Object.keys(characterStore.charOptions.species.options).map((species) => ({
    title: species,
    value: species,
  })),
);

const selectedSpecies = computed({
  get: () => characterStore.newChar.species,
  set: (species) => {
    characterStore.newChar.species = species;
    characterStore.newChar.subspecies = "";
  },
});

const selectedSubspecies = computed({
  get: () => characterStore.newChar.subspecies,
  set: (subspecies) => {
    characterStore.newChar.subspecies = subspecies;
  },
});

const selectedSubspeciesOptions = computed(() => {
  if (!selectedSpecies.value) return [];

  return (
    characterStore.charOptions.species.options[selectedSpecies.value] ?? []
  );
});

const hasSubspecies = computed(
  () => selectedSubspeciesOptions.value.length > 0,
);

const backgroundOptions = computed(() =>
  Object.entries(characterStore.charOptions.background.options).map(
    ([key, background]) => ({
      title: background.label,
      value: key,
    }),
  ),
);

const selectedBackground = computed({
  get: () => characterStore.newChar.background,
  set: (background) => {
    characterStore.newChar.background = background;
  },
});

const selectedClass = computed({
  get: () => characterStore.newChar.class,
  set: (classKey) => {
    characterStore.newChar.class = classKey;
    characterStore.newChar.subclass = "";
    applyClassDefaultAbilityScore(classKey);
  },
});

const selectedSubclass = computed({
  get: () => characterStore.newChar.subclass,
  set: (subclass) => {
    characterStore.newChar.subclass = subclass;
  },
});

const classOptions = computed(() =>
  Object.entries(characterStore.charOptions.class.options).map(
    ([key, value]) => ({
      title: value.label,
      value: key,
    }),
  ),
);

function applyClassDefaultAbilityScore(classKey) {
  const defaultAbilityScore =
    characterStore.charOptions.class.options[classKey]?.default_ability_score;

  if (!defaultAbilityScore) return;

  Object.assign(abilityScore, defaultAbilityScore);
}

const selectedClassData = computed(() => {
  if (!selectedClass.value) return null;
  return characterStore.charOptions.class.options[selectedClass.value];
});

const canChooseSubclass = computed(
  () => Number(characterStore.newChar.level) >= 3,
);

const subclassOptions = computed(() => {
  if (!canChooseSubclass.value || !selectedClassData.value) return [];
  return selectedClassData.value.subclasses;
});
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
            :items="charType"
            v-model="selectedType"
          />
        </div>
      </v-card-title>
      <v-card-text class="flex-grow-1 overflow-y-auto">
        <v-form v-if="selectedType">
          <v-stepper flat v-model="step" :items="steps.map((s) => s.title)">
            <template #item.1>
              <div class="form-grid">
                <v-text-field label="Name" />
                <v-text-field label="Surname" />
                <v-number-input :min="0" label="Age" />
                <v-select
                  v-model="selectedSpecies"
                  label="Species"
                  :items="speciesOptions"
                  item-title="title"
                  item-value="value"
                />
                <v-select
                  v-if="hasSubspecies"
                  v-model="selectedSubspecies"
                  label="Subspecies"
                  :items="selectedSubspeciesOptions"
                />
                <v-select
                  v-model="selectedBackground"
                  label="Background"
                  :items="backgroundOptions"
                  item-title="title"
                  item-value="value"
                />
                <v-number-input
                  v-model="characterStore.newChar.level"
                  label="Level"
                  :min="1"
                  :max="20"
                />
                <v-select
                  v-model="selectedClass"
                  label="Class"
                  :items="classOptions"
                />
                <v-select
                  v-if="canChooseSubclass && selectedClass"
                  v-model="selectedSubclass"
                  label="Subclass"
                  :items="subclassOptions"
                />
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
