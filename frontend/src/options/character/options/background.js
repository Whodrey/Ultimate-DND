export const backgroundAbilityScoreOptions = {
  Acolyte: ["int", "wis", "cha"],
  Artisan: ["str", "dex", "int"],
  Charlatan: ["dex", "con", "cha"],
  Criminal: ["dex", "con", "int"],
  Entertainer: ["str", "dex", "cha"],
  Farmer: ["str", "con", "wis"],
  Guard: ["str", "int", "wis"],
  Guide: ["dex", "con", "wis"],
  Hermit: ["con", "wis", "cha"],
  Merchant: ["con", "int", "cha"],
  Noble: ["str", "int", "cha"],
  Sage: ["con", "int", "wis"],
  Sailor: ["str", "dex", "wis"],
  Scribe: ["dex", "int", "wis"],
  Soldier: ["str", "dex", "con"],
  Wayfarer: ["dex", "wis", "cha"],
};

export const backgroundOptions = {
  label: "Background",
  options: Object.fromEntries(
    Object.entries(backgroundAbilityScoreOptions).map(
      ([background, ability_score_options]) => [
        background,
        {
          label: background,
          ability_score_options,
        },
      ],
    ),
  ),
};
