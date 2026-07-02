import { defineStore } from "pinia";
import { ref } from "vue";
import {
  createEntity,
  deleteEntity,
  listEntities,
  updateEntity,
} from "@/api/entities";
import { npcOptions } from "@/options/npc/options/npcOptions";
import { useCampaignStore } from "./campaignStore";

const campaignStore = useCampaignStore();

export const useNpcStore = defineStore("npc", () => {
  const npcs = ref([]);

  async function getAllNpc() {
    if (!campaignStore.activeCampaignId) {
      npcs.value = [];
      return npcs.value;
    }

    npcs.value = await listEntities(campaignStore.activeCampaignId, "npc");

    return npcs.value;
  }

  async function addNpc(charData) {
    await createEntity(campaignStore.activeCampaignId, charData);
  }

  return {
    npcs,
    npcOptions,
    getAllNpc,
    addNpc,
  };
});
