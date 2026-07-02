import { apiRequest } from "./http";

function getEntitiesPath(campaignId) {
  return `/campaigns/${encodeURIComponent(campaignId)}/entities`;
}

function getEntityPath(campaignId, entityId) {
  return `${getEntitiesPath(campaignId)}/${encodeURIComponent(entityId)}`;
}

export function listEntities(
  campaignId,
  type,
  fallbackMessage = "Could not load entities.",
) {
  const typeQuery = type ? `?type=${encodeURIComponent(type)}` : "";

  return apiRequest(`${getEntitiesPath(campaignId)}${typeQuery}`, {
    fallbackMessage,
  });
}

export function createEntity(
  campaignId,
  entityData,
  fallbackMessage = "Could not create entity.",
) {
  return apiRequest(getEntitiesPath(campaignId), {
    method: "POST",
    body: entityData,
    fallbackMessage,
  });
}

export function updateEntity(
  campaignId,
  entityId,
  entityData,
  fallbackMessage = "Could not update entity.",
) {
  return apiRequest(getEntityPath(campaignId, entityId), {
    method: "PATCH",
    body: entityData,
    fallbackMessage,
  });
}

export function deleteEntity(
  campaignId,
  entityId,
  fallbackMessage = "Could not delete entity.",
) {
  return apiRequest(getEntityPath(campaignId, entityId), {
    method: "DELETE",
    fallbackMessage,
  });
}
