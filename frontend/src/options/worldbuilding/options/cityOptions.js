export const cityOptions = {
  name: {
    label: "City Name",
  },
  size: {
    label: "Size",
    options: ["Hamlet", "Village", "Town", "City", "Metropolis"],
  },
  population: {
    label: "Population",
  },
  vibe: {
    label: "Vibe",
    options: [
      "Bustling",
      "Quiet",
      "Dangerous",
      "Prosperous",
      "Corrupt",
      "Religious",
      "Magical",
      "Industrial",
      "Port",
      "Mining",
      "Farming",
    ],
  },
  demographics: {
    label: "Demographics",
  },
  description: {
    label: "Description",
  },
};

export const citySpeciesOptions = [
  "Aasimar",
  "Dragonborn",
  "Dwarf",
  "Elf",
  "Gnome",
  "Goliath",
  "Halfling",
  "Human",
  "Orc",
  "Tiefling",
];

export const maxDemographicsTotal = 100;

export function createDefaultDemographics() {
  return citySpeciesOptions.map((name) => ({
    name,
    val: 0,
  }));
}
