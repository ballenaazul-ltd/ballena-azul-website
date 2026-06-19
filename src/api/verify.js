import { apiGet } from "./client.js";

export function verifyByTokenId(tokenId) {
  return apiGet(`/v1/verify/${encodeURIComponent(tokenId)}`);
}

export function verifyByWallet(address) {
  return apiGet(`/v1/verify/wallet/${encodeURIComponent(address)}`);
}
