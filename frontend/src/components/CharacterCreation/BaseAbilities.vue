<script setup>
import { computed } from "vue";
import { useCharacterStore } from "@/stores/characterStore";
import { getAbilityScorePointCost } from "@/options/character/rules/abilityScores";

const characterStore = useCharacterStore();

const abilityScore = characterStore.newChar.ability_score;
const pointBuy = characterStore.charOptions.ability_score_point_buy;

const abilities = [
  { key: "str", label: "Strength", shortLabel: "STR" },
  { key: "dex", label: "Dexterity", shortLabel: "DEX" },
  { key: "con", label: "Constitution", shortLabel: "CON" },
  { key: "int", label: "Intelligence", shortLabel: "INT" },
  { key: "wis", label: "Wisdom", shortLabel: "WIS" },
  { key: "cha", label: "Charisma", shortLabel: "CHA" },
];

const abilityScoreBonuses = computed(() => characterStore.specificOptions());
const pointsSpent = computed(() =>
  abilities.reduce(
    (total, ability) => total + getAbilityPointCost(abilityScore[ability.key]),
    0,
  ),
);
const remainingPoints = computed(() => pointBuy.budget - pointsSpent.value);
const pointCounterColor = computed(() =>
  remainingPoints.value < 0 ? "error" : "primary",
);

function getAbilityPointCost(score) {
  return getAbilityScorePointCost(score);
}

function getMaxAffordableScore(abilityKey) {
  const currentCost = getAbilityPointCost(abilityScore[abilityKey]);
  const availablePoints = remainingPoints.value + currentCost;

  for (let score = pointBuy.maxScore; score >= pointBuy.minScore; score -= 1) {
    if (getAbilityPointCost(score) <= availablePoints) {
      return score;
    }
  }

  return pointBuy.minScore;
}

function getAbilityBonus(abilityKey) {
  return abilityScoreBonuses.value[abilityKey] ?? 0;
}

function getAbilityTotal(abilityKey) {
  return Number(abilityScore[abilityKey] || 0) + getAbilityBonus(abilityKey);
}

function getAbilityBonusSource() {
  return characterStore.newChar.background || "Background";
}
</script>

<template>
  <div class="form-grid">
    <v-row class="form-grid__full">
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between ga-3">
          <span>Point Buy</span>
          <v-chip :color="pointCounterColor" size="small" variant="tonal">
            {{ remainingPoints }} / {{ pointBuy.budget }} remaining
          </v-chip>
        </div>
      </v-col>
      <v-col cols="12">
        <v-row class="text-body-2 text-medium-emphasis" density="comfortable">
          <v-col cols="12" sm="3">Ability</v-col>
          <v-col cols="12" sm="3">Base</v-col>
          <v-col cols="12" sm="4">Bonus</v-col>
          <v-col cols="12" sm="2">Total</v-col>
        </v-row>
      </v-col>
      <v-col v-for="ability in abilities" :key="ability.key" cols="12">
        <v-row align="center" density="comfortable">
          <v-col cols="12" sm="3">
            <div class="font-weight-bold">{{ ability.shortLabel }}</div>
            <div class="text-body-2 text-medium-emphasis">
              {{ ability.label }}
            </div>
          </v-col>
          <v-col cols="12" sm="3">
            <v-number-input
              v-model="abilityScore[ability.key]"
              :min="pointBuy.minScore"
              :max="getMaxAffordableScore(ability.key)"
              density="compact"
              hide-details
            />
          </v-col>
          <v-col cols="12" sm="4">
            <v-chip
              v-if="getAbilityBonus(ability.key) > 0"
              color="primary"
              size="small"
              variant="tonal"
            >
              +{{ getAbilityBonus(ability.key) }} from
              {{ getAbilityBonusSource() }}
            </v-chip>
            <span v-else class="text-body-2 text-medium-emphasis">
              No bonus
            </span>
          </v-col>
          <v-col cols="12" sm="2">
            <v-chip size="small" variant="outlined">
              {{ getAbilityTotal(ability.key) }}
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="remainingPoints < 0" cols="12">
        <v-chip :color="pointCounterColor" size="small" variant="tonal">
          Reduce your scores to fit the point budget.
        </v-chip>
      </v-col>
    </v-row>
  </div>
</template>
