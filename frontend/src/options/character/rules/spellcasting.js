import { classOptions } from "../options/class.js";

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
