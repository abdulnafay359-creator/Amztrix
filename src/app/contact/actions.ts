"use server";

import { createDb } from "@/db";
import { auditRequests } from "@/db/schema";

export type AuditState = { status: "idle" | "error" | "success"; message: string };

const marketplaces = new Set([
  "amazon.com", "amazon.ca", "amazon.com.mx", "amazon.com.br", "amazon.co.uk", "amazon.de",
  "amazon.fr", "amazon.it", "amazon.es", "amazon.nl", "amazon.se", "amazon.pl", "amazon.com.be",
  "amazon.ie", "amazon.co.jp", "amazon.in", "amazon.sg", "amazon.com.au", "amazon.ae",
  "amazon.sa", "amazon.eg", "amazon.com.tr", "amazon.co.za",
]);

function amazonLink(input: string) {
  if (input.length > 2048) return null;
  try {
    const url = new URL(input);
    const domain = url.hostname.replace(/^(www|m)\./, "");
    if (url.protocol !== "https:" || url.username || url.password || url.port || !marketplaces.has(domain)) return null;
    const asin = url.pathname.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z\d]{10})(?:\/|$)/i)?.[1];
    if (asin) return `https://www.${domain}/dp/${asin.toUpperCase()}`;
    if (url.pathname === "/" || url.pathname.length < 2) return null;
    return `https://www.${domain}${url.pathname}`;
  } catch {
    return null;
  }
}

export async function submitAudit(_previous: AuditState, data: FormData): Promise<AuditState> {
  const read = (key: string) => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
  };

  const success = { status: "success", message: "Your account review request is in. We’ll follow up by email." } as const;

  if (read("website")) return success;

  const name = read("name");
  const email = read("email");
  const listingUrl = amazonLink(read("listingUrl"));
  const rawNotes = read("notes");
  const serviceFocus = read("serviceFocus").slice(0, 80);
  const startingPoint = read("startingPoint").slice(0, 80);
  const context = [serviceFocus && `Focus: ${serviceFocus}`, startingPoint && `Starting point: ${startingPoint}`].filter(Boolean).join("\n");
  const notes = [context, rawNotes].filter(Boolean).join("\n\n");

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }
  if (!listingUrl) {
    return { status: "error", message: "Enter a full HTTPS link to an Amazon storefront or product page." };
  }
  if (name.length > 100 || rawNotes.length > 1500 || notes.length > 1700) {
    return { status: "error", message: "Keep your name under 100 characters and your notes under 1,500 characters." };
  }

  try {
    await createDb().insert(auditRequests).values({ email, listingUrl, name: name || null, notes: notes || null });
    return success;
  } catch (error) {
    console.error("AMZTRIX audit request could not be saved:", error);
    return { status: "error", message: "We couldn’t save your request. Please try again." };
  }
}
