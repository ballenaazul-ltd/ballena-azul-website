import { apiPost } from "./client.js";

const AUTH_TOKEN_KEY = "ballena_auth_token";

export function getAuthToken() {
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function getAuthAddress() {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return typeof payload.address === "string"
      ? payload.address.toLowerCase()
      : null;
  } catch {
    return null;
  }
}

export function setAuthToken(token) {
  if (token) {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export function requestAuthNonce(address) {
  return apiPost("/v1/auth/nonce", { address });
}

export function verifyAuthMessage({ message, signature }) {
  return apiPost("/v1/auth/verify", { message, signature });
}
