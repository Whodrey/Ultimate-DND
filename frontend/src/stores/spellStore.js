import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useCharacterStore } from "./characterStore";

const spellApiBaseUrl = "https://www.dnd5eapi.co";
const spellApiUrl = `${spellApiBaseUrl}/api/2014/spells`;
const requestOptions = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
  redirect: "follow",
};

async function getSpells() {
  const response = await fetch(spellApiUrl, requestOptions);

  if (!response.ok) {
    throw new Error("Could not load spells.");
  }

  const result = await response.json();
  const detailedSpells = await mapWithConcurrency(
    result.results ?? [],
    8,
    getSpellDetails,
  );

  return orderSpells(detailedSpells);
}

async function getSpellDetails(spell) {
  try {
    const response = await fetch(spellApiBaseUrl + spell.url, requestOptions);

    if (!response.ok) {
      return withSpellSubtitle(spell);
    }

    const details = await response.json();

    return withSpellSubtitle({ ...spell, ...details });
  } catch (error) {
    console.error(error);
    return withSpellSubtitle(spell);
  }
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = [];
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, worker),
  );

  return results;
}

function orderSpells(spells) {
  const orderedSpells = {};

  spells.forEach((spell) => {
    const level = spell.level;

    if (!orderedSpells[level]) {
      orderedSpells[level] = [];
    }

    orderedSpells[level].push(spell);
  });

  return orderedSpells;
}

function withSpellSubtitle(spell) {
  return {
    ...spell,
    subtitle: getSpellSubtitle(spell),
  };
}

function getSpellSubtitle(spell) {
  const description = Array.isArray(spell.desc)
    ? spell.desc.join(" ")
    : spell.desc ?? "";
  const shortDescription = trimToFirstSentence(description);

  return truncateText(shortDescription || getSpellFallbackSubtitle(spell), 120);
}

function trimToFirstSentence(text) {
  const normalizedText = String(text).replace(/\s+/g, " ").trim();
  const sentenceMatch = normalizedText.match(/^.+?[.!?](\s|$)/);

  return sentenceMatch?.[0]?.trim() ?? normalizedText;
}

function truncateText(text, maxLength) {
  const normalizedText = String(text).replace(/\s+/g, " ").trim();

  if (normalizedText.length <= maxLength) return normalizedText;

  return normalizedText.slice(0, maxLength - 1).trimEnd() + "...";
}

function getSpellFallbackSubtitle(spell) {
  const levelLabel =
    Number(spell.level) === 0 ? "Cantrip" : `Level ${spell.level}`;
  const schoolLabel = spell.school?.name;

  return [levelLabel, schoolLabel].filter(Boolean).join(" - ");
}

function normalizeClassLabel(classLabel) {
  return String(classLabel ?? "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
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

function filterSpellsForProfile(items, profile) {
  const spellListClassLabel = profile.spellListClassLabel ?? profile.classLabel;

  return items.filter((spell) => canClassUseSpell(spell, spellListClassLabel));
}

function buildSpellSections(spellsByLevel, profile) {
  if (!profile) return [];

  const sections = [];

  if (profile.cantrips > 0) {
    sections.push({
      level: "0",
      title: "Cantrips",
      limit: profile.cantrips,
      items: filterSpellsForProfile(spellsByLevel[0] ?? [], profile),
    });
  }

  Object.entries(profile.spellLevelLimits)
    .sort(([levelA], [levelB]) => Number(levelA) - Number(levelB))
    .forEach(([level, limit]) => {
      sections.push({
        level,
        title: "Level " + level + " Spells",
        limit,
        items: filterSpellsForProfile(spellsByLevel[level] ?? [], profile),
      });
    });

  return sections;
}

export const useSpellStore = defineStore("spell", () => {
  const characterStore = useCharacterStore();
  const spellsByLevel = ref({});
  const isLoading = ref(false);
  const error = ref(null);
  const hasLoaded = computed(() => Object.keys(spellsByLevel.value).length > 0);
  const spellProfile = computed(() => characterStore.spellcastingProfile());
  const spellSections = computed(() =>
    buildSpellSections(spellsByLevel.value, spellProfile.value),
  );
  const totalSelectedSpells = computed(() => {
    characterStore.ensureCharacterSelections();

    return Object.values(characterStore.newChar.spells).reduce(
      (total, selectedSpells) =>
        total + (Array.isArray(selectedSpells) ? selectedSpells.length : 0),
      0,
    );
  });

  async function loadSpells() {
    if (isLoading.value || hasLoaded.value) return spellsByLevel.value;

    isLoading.value = true;
    error.value = null;

    try {
      spellsByLevel.value = await getSpells();
    } catch (loadError) {
      console.error(loadError);
      error.value = loadError.message ?? "Could not load spells.";
      spellsByLevel.value = {};
    } finally {
      isLoading.value = false;
    }

    return spellsByLevel.value;
  }

  function getSelectedForLevel(level) {
    characterStore.ensureCharacterSelections();

    if (!Array.isArray(characterStore.newChar.spells[level])) {
      characterStore.newChar.spells[level] = [];
    }

    return characterStore.newChar.spells[level];
  }

  function syncSelectedSpellsWithSections(sections = spellSections.value) {
    characterStore.ensureCharacterSelections();

    if (!spellProfile.value) {
      characterStore.newChar.spells = {};
      return;
    }

    if (!hasLoaded.value) {
      characterStore.syncCharacterSelections();
      return;
    }

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
    const allowedSpellIndexes = new Set(
      section.items.map((spell) => spell.index),
    );
    const selectedSpells = Array.isArray(selectedSpellIndexes)
      ? selectedSpellIndexes
      : [];
    const trimmedSpells = Array.from(new Set(selectedSpells))
      .filter(Boolean)
      .filter((spellIndex) => allowedSpellIndexes.has(spellIndex))
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
      syncSelectedSpellsWithSections();
    },
    { immediate: true, deep: true },
  );

  watch(
    () => [hasLoaded.value, spellSections.value],
    ([loaded, sections]) => {
      if (loaded) {
        syncSelectedSpellsWithSections(sections);
      }
    },
    { immediate: true, deep: true },
  );

  return {
    spellsByLevel,
    isLoading,
    error,
    hasLoaded,
    spellProfile,
    spellSections,
    totalSelectedSpells,
    loadSpells,
    getSelectedForLevel,
    syncSelectedSpellsWithSections,
    setSelectedForLevel,
    isSpellDisabled,
    getSpellItemProps,
    getCounterColor,
  };
});
