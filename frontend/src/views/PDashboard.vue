<script setup>
import ActiveTabView from "@/components/TopBar/ActiveTabView.vue";
import { useMenuStore } from "@/stores/menuStore";

const menuStore = useMenuStore();
</script>

<template>
  <ActiveTabView
    :tabs="menuStore.PlayerTabs"
    :active-value="menuStore.activePlayerTab"
  />
</template>
