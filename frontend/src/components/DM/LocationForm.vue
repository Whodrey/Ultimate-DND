<script setup>
import { useLocationStore } from "@/stores/locationStore";
import { computed, ref } from "vue";

const locationStore = useLocationStore();
const props = defineProps({
  location: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["close"]);

const isEditing = computed(() => Boolean(props.location?.id));

function getDefaultSliderValue(fieldKey) {
  return Number(
    Object.keys(locationStore.locationOptions[fieldKey].options)[0] ?? 0,
  );
}

const locationName = ref(props.location?.name ?? "");
const typeSelect = ref(props.location?.type ?? null);
const danger = ref(props.location?.danger ?? getDefaultSliderValue("danger"));
const description = ref(props.location?.description ?? "");
const state = ref(props.location?.state ?? getDefaultSliderValue("state"));

const formTitle = computed(() => {
  if (!isEditing.value) return "Add new location";

  const currentLocationName = locationName.value.trim();
  return currentLocationName ? `Edit ${currentLocationName}` : "Edit location";
});

function resetForm() {
  locationName.value = "";
  typeSelect.value = null;
  danger.value = getDefaultSliderValue("danger");
  description.value = "";
  state.value = getDefaultSliderValue("state");
}

function saveLocation() {
  const locationData = {
    name: locationName.value,
    type: typeSelect.value,
    danger: danger.value,
    description: description.value,
    state: state.value,
  };

  if (isEditing.value) {
    locationStore.updateLocation(props.location.id, locationData);
  } else {
    locationStore.addLocation(locationData);
  }

  resetForm();
  emit("close");
}
</script>

<template>
  <v-container fluid class="pa-0">
    <v-card color="surface" class="pa-5 d-flex flex-column">
      <v-card-title>
        {{ formTitle }}
      </v-card-title>
      <v-card-text class="flex-grow-1 overflow-y-auto">
        <v-form class="form-grid" @submit.prevent="saveLocation">
          <v-text-field
            v-model="locationName"
            :label="locationStore.locationOptions.name.label"
          />
          <v-select
            v-model="typeSelect"
            :label="locationStore.locationOptions.type.label"
            :items="locationStore.locationOptions.type.options"
            item-title="label"
            item-value="value"
          />
          <v-textarea
            v-model="description"
            :label="locationStore.locationOptions.description.label"
          />
          <v-slider
            v-model="danger"
            class="form-grid__full"
            :label="locationStore.locationOptions.danger.label"
            :ticks="locationStore.locationOptions.danger.options"
            min="0"
            show-ticks="always"
            step="1"
            :max="
              Object.keys(locationStore.locationOptions.danger.options)
                .length - 1
            "
          />
          <v-slider
            v-model="state"
            class="form-grid__full"
            :label="locationStore.locationOptions.state.label"
            :ticks="locationStore.locationOptions.state.options"
            min="0"
            show-ticks="always"
            step="1"
            :max="
              Object.keys(locationStore.locationOptions.state.options).length -
              1
            "
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="primary" variant="flat" rounded @click="saveLocation">
          {{ isEditing ? "Save" : "Create" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
