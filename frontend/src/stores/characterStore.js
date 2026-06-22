import { defineStore } from "pinia";
import { ref } from "vue";

export const useCharacterStore = defineStore(
  "character",
  () => {
    const charType = ["simpleNPC", "complexNPC", "NPCwCharSheet", "Player"];
    const range = (min, max) =>
      Array.from({ length: max - min + 1 }, (_, index) => min + index);

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
      level: {
        label: "Level",
        options: range(1, 20),
      },
      ability_score: {
        label: "Ability Scores",
        options: {
          strength: {
            label: "Strength",
            values: range(1, 20),
          },
          dexterity: {
            label: "Dexterity",
            values: range(1, 20),
          },
          constitution: {
            label: "Constitution",
            values: range(1, 20),
          },
          intelligence: {
            label: "Intelligence",
            values: range(1, 20),
          },
          wisdom: {
            label: "Wisdom",
            values: range(1, 20),
          },
          charisma: {
            label: "Charisma",
            values: range(1, 20),
          },
        },
      },
      class: {
        label: "Class",
        options: {
          barbarian: {
            label: "Barbarian",
            subclasses: [
              "Path of the Berserker",
              "Path of the Wild Heart",
              "Path of the World Tree",
              "Path of the Zealot",
            ],
          },
          bard: {
            label: "Bard",
            subclasses: [
              "College of Dance",
              "College of Glamour",
              "College of Lore",
              "College of Valor",
            ],
          },
          cleric: {
            label: "Cleric",
            subclasses: [
              "Life Domain",
              "Light Domain",
              "Trickery Domain",
              "War Domain",
            ],
          },
          druid: {
            label: "Druid",
            subclasses: [
              "Circle of the Land",
              "Circle of the Moon",
              "Circle of the Sea",
              "Circle of the Stars",
            ],
          },
          fighter: {
            label: "Fighter",
            subclasses: [
              "Battle Master",
              "Champion",
              "Eldritch Knight",
              "Psi Warrior",
            ],
          },
          monk: {
            label: "Monk",
            subclasses: [
              "Warrior of Mercy",
              "Warrior of Shadow",
              "Warrior of the Elements",
              "Warrior of the Open Hand",
            ],
          },
          paladin: {
            label: "Paladin",
            subclasses: [
              "Oath of Devotion",
              "Oath of Glory",
              "Oath of the Ancients",
              "Oath of Vengeance",
            ],
          },
          ranger: {
            label: "Ranger",
            subclasses: [
              "Beast Master",
              "Fey Wanderer",
              "Gloom Stalker",
              "Hunter",
            ],
          },
          rogue: {
            label: "Rogue",
            subclasses: ["Arcane Trickster", "Assassin", "Soulknife", "Thief"],
          },
          sorcerer: {
            label: "Sorcerer",
            subclasses: [
              "Aberrant Sorcery",
              "Clockwork Sorcery",
              "Draconic Sorcery",
              "Wild Magic Sorcery",
            ],
          },
          warlock: {
            label: "Warlock",
            subclasses: [
              "Archfey Patron",
              "Celestial Patron",
              "Fiend Patron",
              "Great Old One Patron",
            ],
          },
          wizard: {
            label: "Wizard",
            subclasses: ["Abjurer", "Diviner", "Evoker", "Illusionist"],
          },
        },
      },
    });

    return { charType, charOptions };
  },
  {
    persist: true,
  },
);
