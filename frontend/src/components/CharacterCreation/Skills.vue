<script setup>
import { computed, watch } from "vue";
import { useCharacterStore } from "@/stores/characterStore";
import { getAbilityScoreModifier } from "@/options/character/rules/abilityScores";
import { getProficiencyBonus } from "@/options/character/rules/proficiencies";

const characterStore = useCharacterStore();
const skillGroups = computed(() =>
  Object.entries(characterStore.charOptions.skills.options).map(
    ([key, group]) => ({
      key,
      shortLabel: key.toUpperCase(),
      label: group.label,
      skills: group.skills,
    }),
  ),
);
const classSkillChoices = computed(() => characterStore.classSkillChoices());
const selectedSkills = computed({
  get: () => {
    const skills = characterStore.newChar.skills;

    return Array.isArray(skills) ? skills : [];
  },
  set: (skills) => {
    characterStore.newChar.skills = skills;
    characterStore.syncCharacterSelections();
  },
});
const selectedSkillCount = computed(() => selectedSkills.value.length);
const skillLimit = computed(() => classSkillChoices.value.choose);
const skillCounterColor = computed(() =>
  selectedSkillCount.value > skillLimit.value ? "error" : "primary",
);
const abilityScoreBonuses = computed(() => characterStore.specificOptions());
const proficiencyBonus = computed(() =>
  getProficiencyBonus(characterStore.newChar.level),
);
const skillRows = computed(() =>
  skillGroups.value.flatMap((group) =>
    group.skills.map((skill) => ({
      skill,
      abilityKey: group.key,
      abilityLabel: group.label,
      abilityShortLabel: group.shortLabel,
    })),
  ),
);

function isSkillAllowed(skill) {
  return classSkillChoices.value.options.includes(skill);
}

function isSkillSelected(skill) {
  return selectedSkills.value.includes(skill);
}

function isSkillDisabled(skill) {
  if (isSkillSelected(skill)) return false;
  if (!isSkillAllowed(skill)) return true;

  return selectedSkillCount.value >= skillLimit.value;
}

function getAbilityTotal(abilityKey) {
  return (
    Number(characterStore.newChar.ability_score[abilityKey] || 0) +
    (abilityScoreBonuses.value[abilityKey] ?? 0)
  );
}

function getSkillBaseModifier(abilityKey) {
  return getAbilityScoreModifier(getAbilityTotal(abilityKey));
}

function getSkillProficiencyBonus(skill) {
  return isSkillSelected(skill) ? proficiencyBonus.value : 0;
}

function getSkillTotal(skill, abilityKey) {
  return getSkillBaseModifier(abilityKey) + getSkillProficiencyBonus(skill);
}

function formatBonus(value) {
  const numericValue = Number(value) || 0;

  return numericValue >= 0 ? `+${numericValue}` : String(numericValue);
}

watch(
  classSkillChoices,
  () => {
    characterStore.syncCharacterSelections();
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div class="form-grid">
    <v-row class="form-grid__full">
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between ga-3">
          <span>Skill Proficiencies</span>
          <v-chip :color="skillCounterColor" size="small" variant="tonal">
            {{ selectedSkillCount }} / {{ skillLimit }} selected
          </v-chip>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="skills-table-wrap">
          <v-table class="skills-table" density="compact">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Ability</th>
                <th class="text-center">Base</th>
                <th class="text-center">Proficiency</th>
                <th class="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in skillRows" :key="row.skill">
                <td>
                  <v-checkbox
                    v-model="selectedSkills"
                    :value="row.skill"
                    :label="row.skill"
                    :disabled="isSkillDisabled(row.skill)"
                    density="compact"
                    hide-details
                  />
                </td>
                <td>
                  <div class="font-weight-bold">
                    {{ row.abilityShortLabel }}
                  </div>
                  <div class="text-body-2 text-medium-emphasis">
                    {{ row.abilityLabel }}
                  </div>
                </td>
                <td class="text-center">
                  <v-chip size="small" variant="outlined">
                    {{ formatBonus(getSkillBaseModifier(row.abilityKey)) }}
                  </v-chip>
                </td>
                <td class="text-center">
                  <v-chip
                    :color="isSkillSelected(row.skill) ? 'primary' : undefined"
                    size="small"
                    :variant="isSkillSelected(row.skill) ? 'tonal' : 'outlined'"
                  >
                    {{ formatBonus(getSkillProficiencyBonus(row.skill)) }}
                  </v-chip>
                </td>
                <td class="text-center">
                  <v-chip size="small" variant="outlined">
                    {{ formatBonus(getSkillTotal(row.skill, row.abilityKey)) }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.skills-table-wrap {
  overflow: hidden;
}

.skills-table {
  min-width: 680px;
  table-layout: fixed;
}

.skills-table :deep(.v-table__wrapper) {
  max-height: clamp(320px, 54vh, 520px);
  overflow: auto;
}

.skills-table thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: rgb(var(--v-theme-surface));
}

.skills-table th,
.skills-table td {
  vertical-align: middle;
}

.skills-table th:first-child,
.skills-table td:first-child {
  width: 34%;
}

.skills-table th:nth-child(2),
.skills-table td:nth-child(2) {
  width: 24%;
}

.skills-table th:nth-child(3),
.skills-table td:nth-child(3),
.skills-table th:nth-child(4),
.skills-table td:nth-child(4),
.skills-table th:nth-child(5),
.skills-table td:nth-child(5) {
  width: 14%;
}

.skills-table :deep(.v-selection-control) {
  min-height: 36px;
}
</style>
