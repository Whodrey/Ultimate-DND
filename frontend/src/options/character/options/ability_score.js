const range = (min, max) =>
  Array.from({ length: max - min + 1 }, (_, index) => min + index);

export const abilityScorePointBuy = {
  budget: 27,
  minScore: 8,
  maxScore: 15,
  costs: {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9,
  },
};

export const abilityScoreOptions = {
  label: "Ability Scores",
  options: {
    strength: {
      label: "Strength",
      values: range(abilityScorePointBuy.minScore, abilityScorePointBuy.maxScore),
    },
    dexterity: {
      label: "Dexterity",
      values: range(abilityScorePointBuy.minScore, abilityScorePointBuy.maxScore),
    },
    constitution: {
      label: "Constitution",
      values: range(abilityScorePointBuy.minScore, abilityScorePointBuy.maxScore),
    },
    intelligence: {
      label: "Intelligence",
      values: range(abilityScorePointBuy.minScore, abilityScorePointBuy.maxScore),
    },
    wisdom: {
      label: "Wisdom",
      values: range(abilityScorePointBuy.minScore, abilityScorePointBuy.maxScore),
    },
    charisma: {
      label: "Charisma",
      values: range(abilityScorePointBuy.minScore, abilityScorePointBuy.maxScore),
    },
  },
};
