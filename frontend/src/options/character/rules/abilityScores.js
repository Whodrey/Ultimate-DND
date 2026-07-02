import { abilityScorePointBuy } from "../options/ability_score.js";

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

export function getAbilityScoreModifier(score) {
  const numericScore = Number(score);

  if (!Number.isFinite(numericScore)) {
    return 0;
  }

  return Math.floor((numericScore - 10) / 2);
}
