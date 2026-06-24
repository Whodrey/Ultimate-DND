import { defineStore } from "pinia";
import { ref } from "vue";
import {
  abilityScoreOptions,
  abilityScorePointBuy,
  createPointBuyAbilityScore,
} from "../charOptions/ability_score.js";
import {
  backgroundOptions,
  getBackgroundAbilityScoreBonus,
} from "../charOptions/background.js";
import { classOptions } from "../charOptions/class.js";
import { skillOptions } from "../charOptions/skills.js";
import { speciesOptions } from "../charOptions/species.js";

export const useCharacterStore = defineStore(
  "character",
  () => {
    const charType = ["simpleNPC", "complexNPC", "NPCwCharSheet", "Player"];
    const range = (min, max) =>
      Array.from({ length: max - min + 1 }, (_, index) => min + index);

    const charOptions = ref({
      name: {
        label: "Name",
      },
      surname: {
        label: "Surname",
      },
      age: {
        label: "Age",
      },
      species: speciesOptions,
      background: backgroundOptions,
      skills: skillOptions,
      size: {
        label: "Size",
        options: ["Small", "Medium", "Large"],
      },
      level: {
        label: "Level",
        options: range(1, 20),
      },
      ability_score: abilityScoreOptions,
      ability_score_point_buy: abilityScorePointBuy,
      class: classOptions,
    });

    function specificOptions() {
      return getBackgroundAbilityScoreBonus(newChar.value.background);
    }

    const newChar = ref({
      name: "",
      surname: "",
      age: "",
      species: "",
      subspecies: "",
      background: "",
      level: null,
      ability_score: createPointBuyAbilityScore(),
      class: "",
      subclass: "",
    });

    return { charType, charOptions, newChar, specificOptions };
  },
  {
    persist: true,
  },
);
