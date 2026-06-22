<script setup>
import { computed, useSlots } from "vue";

defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  rowKey: {
    type: [String, Function],
    default: "id",
  },
  density: {
    type: String,
    default: "comfortable",
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  emptyText: {
    type: String,
    default: "No data available.",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  cardColor: {
    type: String,
    default: "surface",
  },
});

const slots = useSlots();

const forwardedSlotNames = computed(() =>
  Object.keys(slots).filter(
    (slotName) => slotName !== "default" && slotName !== "no-data",
  ),
);
</script>

<template>
  <v-card :color="cardColor">
    <v-data-table
      :headers="headers"
      :items="items"
      :item-value="rowKey"
      :density="density"
      :items-per-page="itemsPerPage"
      :loading="loading"
    >
      <template
        v-for="slotName in forwardedSlotNames"
        v-slot:[slotName]="slotProps"
        :key="slotName"
      >
        <slot :name="slotName" v-bind="slotProps" />
      </template>

      <template v-slot:no-data>
        <slot name="no-data">
          <div class="pa-6 text-medium-emphasis">{{ emptyText }}</div>
        </slot>
      </template>
    </v-data-table>
  </v-card>
</template>
