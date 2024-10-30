// app/lib/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";

const BadgeSchema = z.object({
  empName: z.string().min(1, { message: "Employee name is required" }),
  empId: z.string().min(1, { message: "Employee ID is required" }),
  badgeNumber: z.string().min(1, { message: "Badge number is required" }),
});

export async function createBadge(formData: FormData) {
  const validatedFields = BadgeSchema.safeParse({
    empName: formData.get("empName"),
    empId: formData.get("empId"),
    badgeNumber: formData.get("badgeNumber"),
  });

  if (!validatedFields.success) {
    throw new Error("Please fill in all required fields.");
  }

  const { empName, empId, badgeNumber } = validatedFields.data;
  const client = await clientPromise;
  const db = client.db("badge-management");

  await db.collection("badges").insertOne({
    empName,
    empId,
    badgeNumber,
    issueDate: new Date(),
    status: "not returned",
  });

  revalidatePath("/badges");
}

export async function updateBadgeStatus(id: string) {
  const client = await clientPromise;
  const db = client.db("badge-management");

  await db
    .collection("badges")
    .updateOne({ _id: new ObjectId(id) }, { $set: { status: "returned" } });

  revalidatePath("/badges");
}
