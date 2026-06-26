<script setup>
import { computed, watch } from "vue";
import { spells } from "@/charOptions/spells";
import { useCharacterStore } from "@/stores/characterStore";

const characterStore = useCharacterStore();
const spellProfile = computed(() => characterStore.spellcastingProfile());
const spellSections = computed(() => {
  const profile = spellProfile.value;

  if (!profile) return [];

  const sections = [];

  if (profile.cantrips > 0) {
    sections.push({
      level: "0",
      title: "Cantrips",
      limit: profile.cantrips,
      items: filterSpellsForProfile(spells[0] ?? [], profile),
    });
  }

  Object.entries(profile.spellLevelLimits)
    .sort(([levelA], [levelB]) => Number(levelA) - Number(levelB))
    .forEach(([level, limit]) => {
      sections.push({
        level,
        title: "Level " + level + " Spells",
        limit,
        items: filterSpellsForProfile(spells[level] ?? [], profile),
      });
    });

  return sections;
});
const totalSelectedSpells = computed(() => {
  characterStore.ensureCharacterSelections();

  return Object.values(characterStore.newChar.spells).reduce(
    (total, selectedSpells) =>
      total + (Array.isArray(selectedSpells) ? selectedSpells.length : 0),
    0,
  );
});

function filterSpellsForProfile(items, profile) {
  const spellListClassLabel = profile.spellListClassLabel ?? profile.classLabel;

  return items.filter((spell) => canClassUseSpell(spell, spellListClassLabel));
}

function canClassUseSpell(spell, classLabel) {
  const spellClasses = Array.isArray(spell.classes) ? spell.classes : [];

  if (!spellClasses.length) return true;

  return spellClasses.some(
    (spellClass) =>
      normalizeClassLabel(spellClass.name ?? spellClass.index) ===
      normalizeClassLabel(classLabel),
  );
}

function normalizeClassLabel(classLabel) {
  return String(classLabel ?? "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

function getSelectedForLevel(level) {
  characterStore.ensureCharacterSelections();

  if (!Array.isArray(characterStore.newChar.spells[level])) {
    characterStore.newChar.spells[level] = [];
  }

  return characterStore.newChar.spells[level];
}

function syncSelectedSpellsWithSections(sections) {
  characterStore.ensureCharacterSelections();

  characterStore.newChar.spells = Object.fromEntries(
    sections.map((section) => {
      const allowedSpellIndexes = new Set(
        section.items.map((spell) => spell.index),
      );
      const selectedSpells = Array.isArray(
        characterStore.newChar.spells[section.level],
      )
        ? characterStore.newChar.spells[section.level]
        : [];

      return [
        section.level,
        Array.from(new Set(selectedSpells))
          .filter((spellIndex) => allowedSpellIndexes.has(spellIndex))
          .slice(0, section.limit),
      ];
    }),
  );
}

function setSelectedForLevel(section, selectedSpellIndexes) {
  const selectedSpells = Array.isArray(selectedSpellIndexes)
    ? selectedSpellIndexes
    : [];
  const trimmedSpells = Array.from(new Set(selectedSpells))
    .filter(Boolean)
    .slice(0, section.limit);

  characterStore.newChar.spells = {
    ...characterStore.newChar.spells,
    [section.level]: trimmedSpells,
  };
}

function isSpellDisabled(section, spellIndex) {
  const selectedSpells = getSelectedForLevel(section.level);

  return (
    !selectedSpells.includes(spellIndex) &&
    selectedSpells.length >= section.limit
  );
}

function getSpellItemProps(section, spell) {
  const spellData = spell?.raw ?? spell;
  const spellIndex = spellData?.index ?? spell?.value;

  return {
    disabled: isSpellDisabled(section, spellIndex),
    lines: spellData?.subtitle ? "two" : "one",
    subtitle: spellData?.subtitle,
  };
}

function getCounterColor(section) {
  return getSelectedForLevel(section.level).length > section.limit
    ? "error"
    : "primary";
}

watch(
  spellProfile,
  () => {
    characterStore.syncCharacterSelections();
  },
  { immediate: true, deep: true },
);

watch(
  spellSections,
  (sections) => {
    syncSelectedSpellsWithSections(sections);
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div class="form-grid">
    <v-row v-if="spellProfile" class="form-grid__full">
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between ga-3">
          <span>Spells for {{ spellProfile.classLabel }}</span>
          <v-chip color="primary" size="small" variant="tonal">
            {{ totalSelectedSpells }} selected
          </v-chip>
        </div>
      </v-col>
      <v-col cols="12">
        <v-row class="text-body-2 text-medium-emphasis" density="comfortable">
          <v-col cols="12" sm="3">Spell Level</v-col>
          <v-col cols="12" sm="9">Spells</v-col>
        </v-row>
      </v-col>
      <v-col v-for="section in spellSections" :key="section.level" cols="12">
        <v-row align="center" density="comfortable">
          <v-col cols="12" sm="3">
            <div class="font-weight-bold">{{ section.title }}</div>
            <v-chip :color="getCounterColor(section)" size="small" variant="tonal">
              {{ getSelectedForLevel(section.level).length }} /
              {{ section.limit }} selected
            </v-chip>
          </v-col>
          <v-col cols="12" sm="9">
            <v-select
              :model-value="getSelectedForLevel(section.level)"
              @update:model-value="(spells) => setSelectedForLevel(section, spells)"
              :items="section.items"
              :item-props="(spell) => getSpellItemProps(section, spell)"
              item-title="name"
              item-value="index"
              :label="section.title"
              :disabled="!section.items.length"
              multiple
              chips
              closable-chips
              hide-selected
              :menu-props="{ maxHeight: 360 }"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else class="form-grid__full">
      <v-col cols="12">
        <v-chip color="primary" size="small" variant="tonal">
          No spellcasting available
        </v-chip>
      </v-col>
    </v-row>
  </div>
</template>
