import { headers } from "next/headers";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function normalizeHost(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .split(":")[0];
}

function parseAllowedHosts(raw) {
  return new Set(
    String(raw || "")
      .split(",")
      .map((item) => normalizeHost(item))
      .filter(Boolean)
  );
}

export function getRequestHostFromHeaders(requestHeaders) {
  const hostValue = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "";
  return normalizeHost(hostValue);
}

export function isAdminHostAllowed(host) {
  const normalized = normalizeHost(host);

  if (LOCAL_HOSTS.has(normalized)) {
    return true;
  }

  const enableRemote = process.env.CONTENT_ADMIN_ENABLE_REMOTE === "true";
  if (!enableRemote) {
    return false;
  }

  const allowedHosts = parseAllowedHosts(process.env.CONTENT_ADMIN_ALLOWED_HOSTS);
  if (allowedHosts.has("*")) {
    return true;
  }

  return allowedHosts.has(normalized);
}

export async function assertAdminRequestAllowed() {
  const requestHeaders = await headers();
  const host = getRequestHostFromHeaders(requestHeaders);

  if (!isAdminHostAllowed(host)) {
    throw new Error(
      "Admin access blocked for this host. Set CONTENT_ADMIN_ENABLE_REMOTE=true and add host to CONTENT_ADMIN_ALLOWED_HOSTS."
    );
  }
}
