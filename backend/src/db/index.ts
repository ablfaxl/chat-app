import { Pool } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import * as userSchema from "./schema/user";
import * as conversationSchema from "./schema/conversation";
import * as messageSchema from "./schema/message";
import * as userConversationSchema from "./schema/userConversation";

if (
  !process.env.POSTGRES_HOST ||
  !process.env.POSTGRES_DB ||
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_PASSWORD
) {
  throw new Error("Database credentials missing... ");
}

const pool = new Pool({
  port: Number(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const combinedSchemas = {
  ...userSchema,
  ...conversationSchema,
  ...messageSchema,
  ...userConversationSchema,
  // Add other schemas here
};
export const db: NodePgDatabase<typeof combinedSchemas> = drizzle(pool, {
  schema: combinedSchemas,
});
