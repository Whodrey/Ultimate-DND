import { defineStore } from "pinia";
import { ref } from "vue";

export const useCharacterStore = defineStore(
  "character",
  () => {
    const charType = ["simpleNPC", "complexNPC", "NPCwCharSheet", "Player"];

    const charOptions = ref({
      name: {
        label: "Name",
      },
      surname: {
        label: "Surname",
      },
      age: {
        label: "Age",
      },
      species: {
        label: "Species",
        options: [
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
        ],
      },
    });

    return {};
  },
  {
    persist: true,
  },
);
