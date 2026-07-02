import { defineStore } from "pinia";
import { ref } from "vue";
import {
  abilityScoreOptions,
  abilityScorePointBuy,
} from "@/options/character/options/ability_score.js";
import { backgroundOptions } from "@/options/character/options/background.js";
import { classOptions } from "@/options/character/options/class.js";
import { skillOptions } from "@/options/character/options/skills.js";
import { speciesOptions } from "@/options/character/options/species.js";
import { createPointBuyAbilityScore } from "@/options/character/rules/abilityScores.js";
import { getBackgroundAbilityScoreBonus } from "@/options/character/rules/background.js";
import { getClassSkillChoices } from "@/options/character/rules/skills.js";
import { getClassSpellcastingProfile } from "@/options/character/rules/spellcasting.js";

export const useCharacterStore = defineStore(
  "character",
  () => {
    const range = (min, max) =>
      Array.from({ length: max - min + 1 }, (_, index) => min + index);

    const charType = [
      { title: "Simple NPC", value: "simplenpc" },
      { title: "Complex NPC", value: "complexnpc" },
      { title: "NPC with Character Sheet", value: "npcwcharsheet" },
      { title: "Player", value: "player" },
    ];
    const selectedType = ref(null);

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
      skills: [],
      spells: {},
    });

    function ensureCharacterSelections() {
      const character = newChar.value;

      if (!Array.isArray(character.skills)) {
        character.skills = [];
      }

      if (
        !character.spells ||
        typeof character.spells !== "object" ||
        Array.isArray(character.spells)
      ) {
        character.spells = {};
      }
    }

    function specificOptions() {
      return getBackgroundAbilityScoreBonus(newChar.value.background);
    }

    function classSkillChoices() {
      return getClassSkillChoices(newChar.value.class);
    }

    function spellcastingProfile() {
      return getClassSpellcastingProfile(
        newChar.value.class,
        newChar.value.level,
        newChar.value.subclass,
      );
    }

    function canUseSpells() {
      return Boolean(spellcastingProfile());
    }

    function syncCharacterSelections() {
      ensureCharacterSelections();

      const character = newChar.value;
      const skillChoices = classSkillChoices();
      const allowedSkills = new Set(skillChoices.options);

      character.skills = Array.from(new Set(character.skills))
        .filter((skill) => allowedSkills.has(skill))
        .slice(0, skillChoices.choose);

      const spellProfile = spellcastingProfile();

      if (!spellProfile) {
        character.spells = {};
        return;
      }

      const spellLimits = { ...spellProfile.spellLevelLimits };

      if (spellProfile.cantrips > 0) {
        spellLimits[0] = spellProfile.cantrips;
      }

      character.spells = Object.fromEntries(
        Object.entries(spellLimits).map(([level, limit]) => {
          const selectedSpells = Array.isArray(character.spells[level])
            ? character.spells[level]
            : [];

          return [
            level,
            Array.from(new Set(selectedSpells)).filter(Boolean).slice(0, limit),
          ];
        }),
      );
    }

    return {
      charType,
      selectedType,
      charOptions,
      newChar,
      specificOptions,
      ensureCharacterSelections,
      classSkillChoices,
      spellcastingProfile,
      canUseSpells,
      syncCharacterSelections,
    };
  },
  {
    persist: true,
  },
);
