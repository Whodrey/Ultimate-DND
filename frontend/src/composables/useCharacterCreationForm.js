import { computed, ref, watch } from "vue";
import { useCharacterStore } from "@/stores/characterStore";
import { useSpellStore } from "@/stores/spellStore";
import {
  getCharacterCreationFieldOptions,
  getCharacterCreationSteps,
  getClassDefaultAbilityScore,
  hasCharacterBuildFields,
} from "@/options/character/rules/characterCreation";
import {
  getClassData,
  getSubclassOptions,
} from "@/options/character/rules/subclasses";

export function useCharacterCreationForm() {
  const characterStore = useCharacterStore();
  const spellStore = useSpellStore();
  const step = ref(1);

  const steps = computed(() =>
    getCharacterCreationSteps(
      characterStore.selectedType,
      characterStore.canUseSpells(),
    ),
  );
  const stepItems = computed(() =>
    steps.value.map((visibleStep) => visibleStep.title),
  );
  const hasSpellStep = computed(() =>
    steps.value.some((visibleStep) => visibleStep.value === 4),
  );
  const showCharacterBuildFields = computed(() =>
    hasCharacterBuildFields(characterStore.selectedType),
  );

  const fieldOptions = computed(() =>
    getCharacterCreationFieldOptions(
      characterStore.charOptions,
      characterStore.newChar,
    ),
  );
  const selectedClassData = computed(() =>
    getClassData(characterStore.charOptions.class, characterStore.newChar.class),
  );
  const subclassOptions = computed(() =>
    getSubclassOptions(selectedClassData.value, characterStore.newChar.level),
  );

  function selectSpecies(species) {
    characterStore.newChar.species = species;
    characterStore.newChar.subspecies = "";
  }

  function selectSubspecies(subspecies) {
    characterStore.newChar.subspecies = subspecies;
  }

  function selectBackground(background) {
    characterStore.newChar.background = background;
  }

  function selectClass(classKey) {
    characterStore.newChar.class = classKey;
    characterStore.newChar.subclass = "";

    const defaultAbilityScore = getClassDefaultAbilityScore(
      characterStore.charOptions.class,
      classKey,
    );

    if (defaultAbilityScore) {
      Object.assign(characterStore.newChar.ability_score, defaultAbilityScore);
    }

    characterStore.syncCharacterSelections();
  }

  function selectSubclass(subclass) {
    characterStore.newChar.subclass = subclass;
    characterStore.syncCharacterSelections();
  }

  watch(
    stepItems,
    () => {
      if (step.value > stepItems.value.length) {
        step.value = stepItems.value.length;
      }
    },
    { immediate: true },
  );

  watch(
    hasSpellStep,
    (isVisible) => {
      if (isVisible) {
        spellStore.loadSpells();
      }
    },
    { immediate: true },
  );

  watch(
    () => [
      characterStore.newChar.class,
      characterStore.newChar.level,
      characterStore.newChar.subclass,
    ],
    () => {
      if (!subclassOptions.value && characterStore.newChar.subclass) {
        characterStore.newChar.subclass = "";
      }

      characterStore.syncCharacterSelections();
    },
    { immediate: true },
  );

  return {
    characterStore,
    step,
    steps,
    stepItems,
    hasSpellStep,
    showCharacterBuildFields,
    fieldOptions,
    selectSpecies,
    selectSubspecies,
    selectBackground,
    subclassOptions,
    selectClass,
    selectSubclass,
  };
}
