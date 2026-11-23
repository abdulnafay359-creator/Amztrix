import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const auditRequests = pgTable("audit_requests", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: text().notNull(),
  listingUrl: text("listing_url").notNull(),
  name: text(),
  notes: text(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
