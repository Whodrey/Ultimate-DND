<script setup>
import TopBar from "@/components/TopBar/TopBar.vue";
import BottomBar from "@/components/BottomBar.vue";
</script>

<template>
  <v-app>
    <TopBar />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <BottomBar />
  </v-app>
</template>

<style scoped></style>
