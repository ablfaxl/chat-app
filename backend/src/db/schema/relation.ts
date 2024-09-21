import { relations } from "drizzle-orm";
import { messageSchema } from "./message";
import { conversationSchema } from "./conversation";
import { userSchema } from "./user";
import { userConversationSchema } from "./userConversation";

// Message Relations
export const messageRelations = relations(messageSchema, ({ one }) => ({
  conversation: one(conversationSchema, {
    fields: [messageSchema.conversationId],
    references: [conversationSchema.id],
  }),
  sender: one(userSchema, {
    fields: [messageSchema.senderId],
    references: [userSchema.id],
  }),
  receiver: one(userSchema, {
    fields: [messageSchema.receiverId],
    references: [userSchema.id],
  }),
}));

// Conversation Relations
export const conversationRelations = relations(
  conversationSchema,
  ({ many }) => ({
    messages: many(messageSchema),
    users: many(userConversationSchema),
  })
);

// User Relations
export const userRelations = relations(userSchema, ({ many }) => ({
  // sentMessages: many(messageSchema, {
  //   fields: [messageSchema.senderId],
  //   references: [userSchema.id],
  // }),
  // receivedMessages: many(messageSchema, {
  //   fields: [messageSchema.receiverId],
  //   references: [userSchema.id],
  // }),
  sentMessages: many(messageSchema),
  receivedMessages: many(messageSchema),
  conversations: many(userConversationSchema),
}));

// User-Conversation Relations
export const userConversationRelations = relations(
  userConversationSchema,
  ({ one }) => ({
    user: one(userSchema, {
      fields: [userConversationSchema.userId],
      references: [userSchema.id],
    }),
    conversation: one(conversationSchema, {
      fields: [userConversationSchema.conversationId],
      references: [conversationSchema.id],
    }),
  })
);
