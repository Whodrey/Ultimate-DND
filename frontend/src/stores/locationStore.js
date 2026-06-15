import { defineStore } from "pinia";
import { ref } from "vue";

export const useLocationStore = defineStore(
  "location",
  () => {
    return {};
  },
  {
    persist: true,
  },
);
