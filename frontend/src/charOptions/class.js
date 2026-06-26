export const classOptions = {
  label: "Class",
  options: {
    barbarian: {
      label: "Barbarian",
      default_ability_score: {
        str: 15,
        dex: 13,
        con: 14,
        int: 10,
        wis: 12,
        cha: 8,
      },
      subclasses: [
        "Path of the Berserker",
        "Path of the Wild Heart",
        "Path of the World Tree",
        "Path of the Zealot",
      ],
      skill_proficiencies: {
        choose: 2,
        options: [
          "Animal Handling",
          "Athletics",
          "Intimidation",
          "Nature",
          "Perception",
          "Survival",
        ],
      },
    },
    bard: {
      label: "Bard",
      default_ability_score: {
        str: 8,
        dex: 14,
        con: 12,
        int: 13,
        wis: 10,
        cha: 15,
      },
      subclasses: [
        "College of Dance",
        "College of Glamour",
        "College of Lore",
        "College of Valor",
      ],
      skill_proficiencies: {
        choose: 3,
        options: "any",
      },
      spellcasting: {
        type: "full",
        cantripsKnown: {
          1: 2,
          4: 3,
          10: 4,
        },
      },
    },
    cleric: {
      label: "Cleric",
      default_ability_score: {
        str: 14,
        dex: 8,
        con: 13,
        int: 10,
        wis: 15,
        cha: 12,
      },
      subclasses: [
        "Life Domain",
        "Light Domain",
        "Trickery Domain",
        "War Domain",
      ],
      skill_proficiencies: {
        choose: 2,
        options: ["History", "Insight", "Medicine", "Persuasion", "Religion"],
      },
      spellcasting: {
        type: "full",
        cantripsKnown: {
          1: 3,
          4: 4,
          10: 5,
        },
      },
    },
    druid: {
      label: "Druid",
      default_ability_score: {
        str: 8,
        dex: 12,
        con: 14,
        int: 13,
        wis: 15,
        cha: 10,
      },
      subclasses: [
        "Circle of the Land",
        "Circle of the Moon",
        "Circle of the Sea",
        "Circle of the Stars",
      ],
      skill_proficiencies: {
        choose: 2,
        options: [
          "Arcana",
          "Animal Handling",
          "Insight",
          "Medicine",
          "Nature",
          "Perception",
          "Religion",
          "Survival",
        ],
      },
      spellcasting: {
        type: "full",
        cantripsKnown: {
          1: 2,
          4: 3,
          10: 4,
        },
      },
    },
    fighter: {
      label: "Fighter",
      default_ability_score: {
        str: 15,
        dex: 14,
        con: 13,
        int: 8,
        wis: 10,
        cha: 12,
      },
      subclasses: [
        "Battle Master",
        "Champion",
        "Eldritch Knight",
        "Psi Warrior",
      ],
      skill_proficiencies: {
        choose: 2,
        options: [
          "Acrobatics",
          "Animal Handling",
          "Athletics",
          "History",
          "Insight",
          "Intimidation",
          "Perception",
          "Survival",
        ],
      },
      subclass_spellcasting: {
        "Eldritch Knight": {
          type: "third",
          spellListClass: "Wizard",
          minLevel: 3,
          cantripsKnown: {
            3: 2,
            10: 3,
          },
        },
      },
    },
    monk: {
      label: "Monk",
      default_ability_score: {
        str: 12,
        dex: 15,
        con: 13,
        int: 10,
        wis: 14,
        cha: 8,
      },
      subclasses: [
        "Warrior of Mercy",
        "Warrior of Shadow",
        "Warrior of the Elements",
        "Warrior of the Open Hand",
      ],
      skill_proficiencies: {
        choose: 2,
        options: [
          "Acrobatics",
          "Athletics",
          "History",
          "Insight",
          "Religion",
          "Stealth",
        ],
      },
    },
    paladin: {
      label: "Paladin",
      default_ability_score: {
        str: 15,
        dex: 10,
        con: 13,
        int: 8,
        wis: 12,
        cha: 14,
      },
      subclasses: [
        "Oath of Devotion",
        "Oath of Glory",
        "Oath of the Ancients",
        "Oath of Vengeance",
      ],
      skill_proficiencies: {
        choose: 2,
        options: [
          "Athletics",
          "Insight",
          "Intimidation",
          "Medicine",
          "Persuasion",
          "Religion",
        ],
      },
      spellcasting: {
        type: "half",
        minLevel: 2,
      },
    },
    ranger: {
      label: "Ranger",
      default_ability_score: {
        str: 12,
        dex: 15,
        con: 13,
        int: 8,
        wis: 14,
        cha: 10,
      },
      subclasses: ["Beast Master", "Fey Wanderer", "Gloom Stalker", "Hunter"],
      skill_proficiencies: {
        choose: 3,
        options: [
          "Animal Handling",
          "Athletics",
          "Insight",
          "Investigation",
          "Nature",
          "Perception",
          "Stealth",
          "Survival",
        ],
      },
      spellcasting: {
        type: "half",
        minLevel: 2,
      },
    },
    rogue: {
      label: "Rogue",
      default_ability_score: {
        str: 12,
        dex: 15,
        con: 13,
        int: 14,
        wis: 10,
        cha: 8,
      },
      subclasses: ["Arcane Trickster", "Assassin", "Soulknife", "Thief"],
      skill_proficiencies: {
        choose: 4,
        options: [
          "Acrobatics",
          "Athletics",
          "Deception",
          "Insight",
          "Intimidation",
          "Investigation",
          "Perception",
          "Performance",
          "Persuasion",
          "Sleight of Hand",
          "Stealth",
        ],
      },
      subclass_spellcasting: {
        "Arcane Trickster": {
          type: "third",
          spellListClass: "Wizard",
          minLevel: 3,
          cantripsKnown: {
            3: 3,
            10: 4,
          },
        },
      },
    },
    sorcerer: {
      label: "Sorcerer",
      default_ability_score: {
        str: 10,
        dex: 13,
        con: 14,
        int: 8,
        wis: 12,
        cha: 15,
      },
      subclasses: [
        "Aberrant Sorcery",
        "Clockwork Sorcery",
        "Draconic Sorcery",
        "Wild Magic Sorcery",
      ],
      skill_proficiencies: {
        choose: 2,
        options: [
          "Arcana",
          "Deception",
          "Insight",
          "Intimidation",
          "Persuasion",
          "Religion",
        ],
      },
      spellcasting: {
        type: "full",
        cantripsKnown: {
          1: 4,
          4: 5,
          10: 6,
        },
      },
    },
    warlock: {
      label: "Warlock",
      default_ability_score: {
        str: 8,
        dex: 14,
        con: 13,
        int: 12,
        wis: 10,
        cha: 15,
      },
      subclasses: [
        "Archfey Patron",
        "Celestial Patron",
        "Fiend Patron",
        "Great Old One Patron",
      ],
      skill_proficiencies: {
        choose: 2,
        options: [
          "Arcana",
          "Deception",
          "History",
          "Intimidation",
          "Investigation",
          "Nature",
          "Religion",
        ],
      },
      spellcasting: {
        type: "pact",
        cantripsKnown: {
          1: 2,
          4: 3,
          10: 4,
        },
      },
    },
    wizard: {
      label: "Wizard",
      default_ability_score: {
        str: 8,
        dex: 12,
        con: 13,
        int: 15,
        wis: 14,
        cha: 10,
      },
      subclasses: ["Abjurer", "Diviner", "Evoker", "Illusionist"],
      skill_proficiencies: {
        choose: 2,
        options: [
          "Arcana",
          "History",
          "Insight",
          "Investigation",
          "Medicine",
          "Religion",
        ],
      },
      spellcasting: {
        type: "full",
        cantripsKnown: {
          1: 3,
          4: 4,
          10: 5,
        },
      },
    },
  },
};

const allSkills = [
  "Athletics",
  "Acrobatics",
  "Sleight of Hand",
  "Stealth",
  "Arcana",
  "History",
  "Investigation",
  "Nature",
  "Religion",
  "Animal Handling",
  "Insight",
  "Medicine",
  "Perception",
  "Survival",
  "Deception",
  "Intimidation",
  "Performance",
  "Persuasion",
];

const spellSlotsByCasterType = {
  full: {
    1: { 1: 2 },
    2: { 1: 3 },
    3: { 1: 4, 2: 2 },
    4: { 1: 4, 2: 3 },
    5: { 1: 4, 2: 3, 3: 2 },
    6: { 1: 4, 2: 3, 3: 3 },
    7: { 1: 4, 2: 3, 3: 3, 4: 1 },
    8: { 1: 4, 2: 3, 3: 3, 4: 2 },
    9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
    10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
    11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
    12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
    13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
    14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
    15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
    16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
    17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
    18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
    19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
    20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
  },
  half: {
    2: { 1: 2 },
    3: { 1: 3 },
    4: { 1: 3 },
    5: { 1: 4, 2: 2 },
    6: { 1: 4, 2: 2 },
    7: { 1: 4, 2: 3 },
    8: { 1: 4, 2: 3 },
    9: { 1: 4, 2: 3, 3: 2 },
    10: { 1: 4, 2: 3, 3: 2 },
    11: { 1: 4, 2: 3, 3: 3 },
    12: { 1: 4, 2: 3, 3: 3 },
    13: { 1: 4, 2: 3, 3: 3, 4: 1 },
    14: { 1: 4, 2: 3, 3: 3, 4: 1 },
    15: { 1: 4, 2: 3, 3: 3, 4: 2 },
    16: { 1: 4, 2: 3, 3: 3, 4: 2 },
    17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
    18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
    19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
    20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  },
  third: {
    3: { 1: 2 },
    4: { 1: 3 },
    5: { 1: 3 },
    6: { 1: 3 },
    7: { 1: 4, 2: 2 },
    8: { 1: 4, 2: 2 },
    9: { 1: 4, 2: 2 },
    10: { 1: 4, 2: 3 },
    11: { 1: 4, 2: 3 },
    12: { 1: 4, 2: 3 },
    13: { 1: 4, 2: 3, 3: 2 },
    14: { 1: 4, 2: 3, 3: 2 },
    15: { 1: 4, 2: 3, 3: 2 },
    16: { 1: 4, 2: 3, 3: 3 },
    17: { 1: 4, 2: 3, 3: 3 },
    18: { 1: 4, 2: 3, 3: 3 },
    19: { 1: 4, 2: 3, 3: 3, 4: 1 },
    20: { 1: 4, 2: 3, 3: 3, 4: 1 },
  },
  pact: {
    1: { 1: 1 },
    2: { 1: 2 },
    3: { 2: 2 },
    4: { 2: 2 },
    5: { 3: 2 },
    6: { 3: 2 },
    7: { 4: 2 },
    8: { 4: 2 },
    9: { 5: 2 },
    10: { 5: 2 },
    11: { 5: 3 },
    12: { 5: 3 },
    13: { 5: 3 },
    14: { 5: 3 },
    15: { 5: 3 },
    16: { 5: 3 },
    17: { 5: 4 },
    18: { 5: 4 },
    19: { 5: 4 },
    20: { 5: 4 },
  },
};

function clampLevel(level) {
  const numericLevel = Number(level);

  if (!Number.isFinite(numericLevel)) return 1;

  return Math.min(20, Math.max(1, numericLevel));
}

function getProgressionValue(progression = {}, level) {
  return Object.entries(progression).reduce((current, [minimumLevel, value]) => {
    if (Number(minimumLevel) <= level) return value;
    return current;
  }, 0);
}

function getSpellcastingConfig(classData, level, subclass) {
  if (classData?.spellcasting) {
    const minLevel = classData.spellcasting.minLevel ?? 1;

    if (level >= minLevel) return classData.spellcasting;
  }

  const subclassSpellcasting = classData?.subclass_spellcasting?.[subclass];

  if (!subclassSpellcasting) return null;

  const minLevel = subclassSpellcasting.minLevel ?? 1;

  if (level < minLevel) return null;

  return subclassSpellcasting;
}

export function getClassSkillChoices(classKey) {
  const skillProficiencies =
    classOptions.options[classKey]?.skill_proficiencies ?? {};
  const options =
    skillProficiencies.options === "any"
      ? allSkills
      : skillProficiencies.options ?? [];

  return {
    choose: skillProficiencies.choose ?? 0,
    options,
  };
}

export function getClassSpellcastingProfile(classKey, level, subclass) {
  const classData = classOptions.options[classKey];
  const normalizedLevel = clampLevel(level);
  const spellcastingConfig = getSpellcastingConfig(
    classData,
    normalizedLevel,
    subclass,
  );

  if (!spellcastingConfig) return null;

  const spellLevelLimits =
    spellSlotsByCasterType[spellcastingConfig.type]?.[normalizedLevel] ?? {};
  const cantrips = getProgressionValue(
    spellcastingConfig.cantripsKnown,
    normalizedLevel,
  );
  const hasSpellLimits = Object.keys(spellLevelLimits).length > 0;

  if (!cantrips && !hasSpellLimits) return null;

  return {
    classLabel: classData.label,
    spellListClassLabel: spellcastingConfig.spellListClass ?? classData.label,
    type: spellcastingConfig.type,
    cantrips,
    spellLevelLimits,
  };
}
