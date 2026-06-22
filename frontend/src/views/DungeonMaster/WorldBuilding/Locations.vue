<script setup>
import { useLocationStore } from "@/stores/locationStore";
import LocationForm from "@/components/DM/LocationForm.vue";
import DataTableDisplay from "@/components/DataTableDisplay.vue";
import { computed, ref } from "vue";

const locationStore = useLocationStore();
const addLocation = ref(false);
const editLocation = ref(false);
const selectedLocation = ref(null);

const locationTableDisplayFields = {
  name: "nameDisplay",
  type: "typeDisplay",
  danger: "dangerDisplay",
  state: "stateDisplay",
};

const locationTableHeaders = computed(() => [
  ...Object.entries(locationStore.locationOptions).map(([fieldKey, field]) => ({
    title: field.label,
    key: locationTableDisplayFields[fieldKey] ?? fieldKey,
  })),
  { title: "", key: "actions", sortable: false, align: "end" },
]);

function formatOptionLabel(options, value) {
  if (Array.isArray(options)) {
    return (
      options.find((option) => option.value === value)?.label ?? "Unspecified"
    );
  }

  return options?.[value] || "Unspecified";
}

const locationRows = computed(() =>
  locationStore.locations.map((location) => ({
    ...location,
    nameDisplay: location.name || "Unnamed location",
    typeDisplay: formatOptionLabel(
      locationStore.locationOptions.type.options,
      location.type,
    ),
    dangerDisplay: formatOptionLabel(
      locationStore.locationOptions.danger.options,
      location.danger,
    ),
    stateDisplay: formatOptionLabel(
      locationStore.locationOptions.state.options,
      location.state,
    ),
  })),
);

function openEditLocation(location) {
  selectedLocation.value = location;
  editLocation.value = true;
}

function closeEditLocation() {
  editLocation.value = false;
  selectedLocation.value = null;
}
</script>

<template>
  <v-container fluid>
    <v-row class="justify-space-between align-center">
      <v-col cols="auto">
        <h1 class="text-h4">Locations</h1>
      </v-col>

      <v-col cols="auto">
        <v-dialog v-model="addLocation">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn color="primary" v-bind="activatorProps" rounded>+</v-btn>
          </template>
          <template v-slot:default>
            <LocationForm v-if="addLocation" @close="addLocation = false" />
          </template>
        </v-dialog>
      </v-col>
    </v-row>

    <DataTableDisplay
      class="mt-4"
      empty-text="No locations created yet."
      row-key="id"
      :headers="locationTableHeaders"
      :items="locationRows"
    >
      <template v-slot:item.actions="{ item }">
        <v-menu>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              icon="mdi-dots-vertical"
              variant="text"
              size="small"
            />
          </template>

          <v-list density="compact">
            <v-list-item @click="openEditLocation(item)">
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </DataTableDisplay>

    <v-dialog v-model="editLocation">
      <LocationForm
        v-if="editLocation && selectedLocation"
        :location="selectedLocation"
        @close="closeEditLocation"
      />
    </v-dialog>
  </v-container>
</template>
