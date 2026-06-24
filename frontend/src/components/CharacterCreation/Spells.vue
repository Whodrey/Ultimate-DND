<script setup>
import { spells } from "@/charOptions/spells";
import { useCharacterStore } from "@/stores/characterStore";

const characterStore = useCharacterStore();
console.log(spells);
</script>

<template>
  <h1>Add spells for {{ characterStore.newChar.class }}</h1>
  <v-form>
    <v-select
      hide-selected
      label="Cantrips"
      :items="spells[0].value.name"
    ></v-select>
  </v-form>
</template>
