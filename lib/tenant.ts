import { headers } from "next/headers";
import { prisma } from "./prisma";

/**
 * Resolves the current store based on the hostname.
 * Supports subdomains (store1.biwal.com) and custom domains (client.com).
 */
export async function getCurrentStore() {
  const host = (await headers()).get("host") || "";
  
  // parts[0] is often the subdomain
  // biwal.london.localhost:3000 -> parts: ['biwal', 'london', 'localhost:3000']
  const parts = host.split(".");
  
  let subdomainOrDomain = "";

  if (host.includes("localhost") || host.includes(".vercel.app")) {
    // If we have at least 2 parts, the first is usually the subdomain
    // e.g. 'biwal.localhost:3000' -> parts.length === 2, parts[0] === 'biwal'
    // e.g. 'localhost:3000' -> parts.length === 1, no subdomain
    if (parts.length > 1) {
      subdomainOrDomain = parts[0];
    } else {
      // Default to the first store in the database if no subdomain provided on localhost
      // This is helpful for local development without complex host configurations
      const defaultStore = await prisma.store.findFirst();
      return defaultStore;
    }
  } else {
    // In production, we check for both subdomain and full domain
    // If host is 'store1.biwal.com', parts[0] is 'store1'
    // If host is 'mystore.com', parts[0] is 'mystore' (which is the subdomain record)
    subdomainOrDomain = parts[0];
  }

  const store = await prisma.store.findFirst({
    where: {
      OR: [
        { subdomain: subdomainOrDomain },
        { customDomain: host }
      ]
    }
  });

  return store;
}

/**
 * Helper to get only the storeId, throwing an error if not found.
 */
export async function getStoreIdOrThrow() {
  const store = await getCurrentStore();
  if (!store) {
    throw new Error("Store not found for this domain.");
  }
  return store.id;
}
