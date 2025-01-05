import { db } from "@/db";
import { workspace } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getMyWorkspaces(userId: string) {
  return await db.select().from(workspace).where(eq(workspace.ownerId, userId));
}
