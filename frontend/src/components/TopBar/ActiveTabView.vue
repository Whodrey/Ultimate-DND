<script setup>
import { computed } from "vue";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeValue: {
    type: String,
    default: null,
  },
});

const activeView = computed(() => {
  const activeTab =
    props.tabs.find((tab) => tab.value === props.activeValue) ?? props.tabs[0];

  return activeTab?.component ?? null;
});
</script>

<template>
  <component :is="activeView" v-if="activeView" />
</template>
