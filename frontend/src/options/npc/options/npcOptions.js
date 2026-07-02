export const npcDispositionOptions = [
  { label: "Ally", value: "ally" },
  { label: "Neutral", value: "neutral" },
  { label: "Enemy", value: "enemy" },
];

export const npcOptions = {
  name: {
    label: "Name",
  },
  role: {
    label: "Role",
  },
  disposition: {
    label: "Disposition",
    options: npcDispositionOptions,
  },
  species: {
    label: "Species",
  },
  location: {
    label: "Location",
  },
  summary: {
    label: "Summary",
  },
  secret: {
    label: "Secret",
  },
};
