<script setup>
import ActiveSubtabView from "@/components/TopBar/ActiveSubtabView.vue";
import { useMenuStore } from "@/stores/menuStore";

const menuStore = useMenuStore();
</script>

<template>
  <div>
    <ActiveSubtabView
      :tabs="menuStore.DMtabs"
      tab-value="worldbuilding"
      :active-subtabs="menuStore.activeDMSubtabs"
    />
  </div>
</template>
