<script setup>
import ActiveSubtabView from "@/components/TopBar/ActiveSubtabView.vue";
import { useMenuStore } from "@/stores/menuStore";

const menuStore = useMenuStore();
</script>

<template>
  <div>
    <div>npc</div>
    <ActiveSubtabView
      :tabs="menuStore.DMtabs"
      tab-value="npcmanager"
      :active-subtabs="menuStore.activeDMSubtabs"
    />
  </div>
</template>
