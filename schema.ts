import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  originalText: text("original_text").notNull(),
  processedText: text("processed_text"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertArticleSchema = createInsertSchema(articles)
  .omit({ id: true, processedText: true, createdAt: true })
  .extend({
    style: z.enum(["professional", "academic", "casual", "seo", "technical", "persuasive"]).default("professional"),
  });

export const apiKeySchema = z.object({
  key: z.string().min(1, "API key is required"),
});

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;