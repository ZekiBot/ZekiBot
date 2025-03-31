import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  provider: text("provider").default("local"),
  providerId: text("provider_id"),
  points: integer("points").notNull().default(10),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  fullName: true,
  provider: true,
  providerId: true,
});

export const loginUserSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export const pointTransactions = pgTable("point_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPointTransactionSchema = createInsertSchema(pointTransactions).pick({
  userId: true,
  amount: true,
  description: true,
});

export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).pick({
  userId: true,
  title: true,
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  content: text("content").notNull(),
  isUser: boolean("is_user").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  sessionId: true,
  content: true,
  isUser: true,
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  prompt: text("prompt").notNull(),
  url: text("url").notNull(),
  style: text("style"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertImageSchema = createInsertSchema(images).pick({
  userId: true,
  prompt: true,
  url: true,
  style: true,
});

export const codeAssistant = pgTable("code_assistant", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  language: text("language").notNull(),
  prompt: text("prompt").notNull(),
  code: text("code").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCodeAssistantSchema = createInsertSchema(codeAssistant).pick({
  userId: true,
  language: true,
  prompt: true,
  code: true,
});

export const gameScores = pgTable("game_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  gameType: text("game_type").notNull(),
  score: integer("score").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertGameScoreSchema = createInsertSchema(gameScores).pick({
  userId: true,
  gameType: true,
  score: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;
export type PointTransaction = typeof pointTransactions.$inferSelect;
export type ChatSession = typeof chatSessions.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type Image = typeof images.$inferSelect;
export type CodeAssistant = typeof codeAssistant.$inferSelect;
export type GameScore = typeof gameScores.$inferSelect;
export type InsertPointTransaction = z.infer<typeof insertPointTransactionSchema>;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type InsertImage = z.infer<typeof insertImageSchema>;
export type InsertCodeAssistant = z.infer<typeof insertCodeAssistantSchema>;
export type InsertGameScore = z.infer<typeof insertGameScoreSchema>;
