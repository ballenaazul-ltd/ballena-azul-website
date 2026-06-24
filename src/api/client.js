const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "/api" : "");

export function getApiBaseUrl() {
  return API_BASE.replace(/\/$/, "");
}

export async function apiGet(path) {
  const response = await fetch(`${getApiBaseUrl()}${path}`);

  let body;
  try {
    body = await response.json();
  } catch {
    body = { error: "Invalid response from server." };
  }

  return { ok: response.ok, status: response.status, body };
}

export async function apiPost(path, data, token) {
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  let body;
  try {
    body = await response.json();
  } catch {
    body = { error: "Invalid response from server." };
  }

  return { ok: response.ok, status: response.status, body };
}
