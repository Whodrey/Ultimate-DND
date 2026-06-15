<script setup>
import { ref } from "vue";

const locationTypes = ref([{ name: "Dungeon", value: "dungeon" }]);
</script>

<template>
  <v-container fluid>
    <v-card color="surface">
      <v-card-title> Add a new location </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Name"> </v-text-field>
              <v-select
                label="Type"
                :items="locationTypes"
                item-title="name"
                item-value="value"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="primary" variant="flat" rounded @click="">
          {{ isEditing ? "Save" : "Create" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
