export const simpleNpcType = "simplenpc";
export const complexNpcType = "complexnpc";

export function hasCharacterBuildFields(characterType) {
  return Boolean(characterType) && characterType !== simpleNpcType;
}

export function hasFullCharacterSheetSteps(characterType) {
  return (
    Boolean(characterType) &&
    characterType !== simpleNpcType &&
    characterType !== complexNpcType
  );
}

export function getCharacterCreationSteps(characterType, canUseSpells) {
  const steps = [{ value: 1, title: "Identity" }];

  if (hasFullCharacterSheetSteps(characterType)) {
    steps.push(
      { value: 2, title: "Base abilities" },
      { value: 3, title: "Skills" },
    );
  }

  if (hasFullCharacterSheetSteps(characterType) && canUseSpells) {
    steps.push({ value: 4, title: "Spells" });
  }

  return steps;
}

export function getSelectOptions(optionsByKey) {
  return Object.entries(optionsByKey).map(([key, option]) => ({
    title: option.label ?? key,
    value: key,
  }));
}

export function getSpeciesOptions(speciesOptions) {
  return Object.keys(speciesOptions.options).map((species) => ({
    title: species,
    value: species,
  }));
}

export function getAvailableSubspecies(speciesOptions, species) {
  if (!species) return null;

  const subspeciesOptions = speciesOptions.options[species] ?? [];

  return subspeciesOptions.length ? subspeciesOptions : null;
}

export function getClassDefaultAbilityScore(classOptions, classKey) {
  return classOptions.options[classKey]?.default_ability_score ?? null;
}

export function getCharacterCreationFieldOptions(charOptions, character) {
  return {
    species: getSpeciesOptions(charOptions.species),
    subspecies: getAvailableSubspecies(
      charOptions.species,
      character.species,
    ),
    backgrounds: getSelectOptions(charOptions.background.options),
    classes: getSelectOptions(charOptions.class.options),
  };
}
