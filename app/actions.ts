"use server";

import { db } from "@/db";
import { workspace } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

const checkIfUserExists = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return { exists: false };
  }
  return { exists: true, session };
};

export const createWorkspace = async (name: string, description: string) => {
  try {
    console.log("here in create workspace", name, description);
    const { exists, session } = await checkIfUserExists();
    if (!exists) {
      throw new Error("User does not exist");
    }
    await db.insert(workspace).values({
      id: uuid(),
      name: name,
      description: description,
      ownerId: session?.user?.id!,
      logo: "",
      settings: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error("Error creating workspace");
  }
};
