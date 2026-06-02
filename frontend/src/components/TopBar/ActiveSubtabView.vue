<script setup>
import { computed } from "vue";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  tabValue: {
    type: String,
    required: true,
  },
  activeSubtabs: {
    type: Object,
    required: true,
  },
});

const activeView = computed(() => {
  const parentTab = props.tabs.find((tab) => tab.value === props.tabValue);
  const subtabs = parentTab?.subtabs ?? [];
  const activeSubtabValue =
    props.activeSubtabs[props.tabValue] ?? subtabs[0]?.value;

  return (
    subtabs.find((subtab) => subtab.value === activeSubtabValue)?.component ??
    subtabs[0]?.component ??
    null
  );
});
</script>

<template>
  <component :is="activeView" v-if="activeView" />
</template>
