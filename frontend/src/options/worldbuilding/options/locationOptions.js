export const locationOptions = {
  name: {
    label: "Name",
  },
  type: {
    label: "Type",
    options: [
      { label: "Dungeon", value: "dungeon" },
      { label: "Camp", value: "camp" },
      { label: "Grotto", value: "grotto" },
      { label: "Mine", value: "mine" },
    ],
  },
  danger: {
    label: "Danger level",
    options: {
      0: "Safe even at night",
      1: "Safe",
      2: "Stay vigilant",
      3: "Danger close",
      4: "Trapped",
      5: "Attack on sight",
    },
  },
  description: {
    label: "Description",
  },
  state: {
    label: "State",
    options: {
      0: "Destroyed",
      1: "Abandonned",
      2: "In good condition",
      3: "Recent traces",
      4: "Inhabited but no one there right now",
      5: "Actively inhabited",
    },
  },
};
