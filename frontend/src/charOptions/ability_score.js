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

export function createEmptyAbilityScore() {
  return {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  };
}

export function createPointBuyAbilityScore() {
  return {
    str: abilityScorePointBuy.minScore,
    dex: abilityScorePointBuy.minScore,
    con: abilityScorePointBuy.minScore,
    int: abilityScorePointBuy.minScore,
    wis: abilityScorePointBuy.minScore,
    cha: abilityScorePointBuy.minScore,
  };
}

export function getAbilityScorePointCost(score) {
  const numericScore = Number(score);

  if (!Number.isFinite(numericScore)) {
    return 0;
  }

  const clampedScore = Math.min(
    abilityScorePointBuy.maxScore,
    Math.max(abilityScorePointBuy.minScore, numericScore),
  );

  return abilityScorePointBuy.costs[clampedScore] ?? 0;
}

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
