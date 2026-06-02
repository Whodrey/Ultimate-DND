<script setup>
import CampaignSelect from "@/components/TopBar/CampaignSelect.vue";
import DashboardTabs from "@/components/TopBar/DashboardTabs.vue";
import MainNavigation from "@/components/TopBar/MainNavigation.vue";
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-toolbar color="primary">
        <v-toolbar-title text="Ultimate DND" />

        <v-spacer />

        <CampaignSelect />

        <v-spacer />

        <MainNavigation />
      </v-toolbar>
    </v-row>

    <DashboardTabs />
  </v-container>
</template>
