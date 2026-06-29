<script setup>
import { useSpellStore } from "@/stores/spellStore";

const spellStore = useSpellStore();
</script>

<template>
  <div class="form-grid">
    <v-row v-if="spellStore.spellProfile" class="form-grid__full">
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between ga-3">
          <span>Spells for {{ spellStore.spellProfile.classLabel }}</span>
          <v-chip color="primary" size="small" variant="tonal">
            {{ spellStore.totalSelectedSpells }} selected
          </v-chip>
        </div>
      </v-col>
      <v-col cols="12">
        <v-row class="text-body-2 text-medium-emphasis" density="comfortable">
          <v-col cols="12" sm="3">Spell Level</v-col>
          <v-col cols="12" sm="9">Spells</v-col>
        </v-row>
      </v-col>
      <v-col
        v-for="section in spellStore.spellSections"
        :key="section.level"
        cols="12"
      >
        <v-row align="center" density="comfortable">
          <v-col cols="12" sm="3">
            <div class="font-weight-bold">{{ section.title }}</div>
            <v-chip
              :color="spellStore.getCounterColor(section)"
              size="small"
              variant="tonal"
            >
              {{ spellStore.getSelectedForLevel(section.level).length }} /
              {{ section.limit }} selected
            </v-chip>
          </v-col>
          <v-col cols="12" sm="9">
            <v-select
              :model-value="spellStore.getSelectedForLevel(section.level)"
              @update:model-value="
                (spells) => spellStore.setSelectedForLevel(section, spells)
              "
              :items="section.items"
              :item-props="
                (spell) => spellStore.getSpellItemProps(section, spell)
              "
              item-title="name"
              item-value="index"
              :label="section.title"
              :disabled="!section.items.length"
              :loading="spellStore.isLoading"
              multiple
              chips
              closable-chips
              hide-selected
              :menu-props="{ maxHeight: 360 }"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else class="form-grid__full">
      <v-col cols="12">
        <v-chip color="primary" size="small" variant="tonal">
          No spellcasting available
        </v-chip>
      </v-col>
    </v-row>
  </div>
</template>
