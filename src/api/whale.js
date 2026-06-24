import { apiGet, apiPost } from "./client.js";
import { getAuthToken } from "./auth.js";

export function registerWhale(payload) {
  return apiPost("/v1/whale/register", payload, getAuthToken());
}

export function getWhaleProfile(address) {
  return apiGet(`/v1/whale/profile/${encodeURIComponent(address)}`);
}
