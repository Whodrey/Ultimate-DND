import { backgroundOptions } from "../options/background.js";
import { createEmptyAbilityScore } from "./abilityScores.js";

export function getBackgroundAbilityScoreBonus(backgroundName) {
  const abilityScore = createEmptyAbilityScore();
  const background = backgroundOptions.options[backgroundName];
  const backgroundAbilityScores = background?.ability_score_options ?? [];

  backgroundAbilityScores.forEach((ability) => {
    abilityScore[ability] += 1;
  });

  return abilityScore;
}
