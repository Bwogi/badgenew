import BadgeForm from "../ui/badge-form";
import BadgeList from "../ui/badge-list";
import { Toaster } from "@/components/ui/toaster";
import clientPromise from "../lib/mongodb";
import { Badge } from "../lib/definitions";
import { Separator } from "@/components/ui/separator";

export default async function BadgesPage() {
  const client = await clientPromise;
  const db = client.db("badge-management");
  const badges = await db
    .collection("badges")
    .find({})
    .sort({ issueDate: -1 })
    .toArray();

  // Serialize the MongoDB documents to plain objects
  const serializedBadges: Badge[] = badges.map((badge) => ({
    id: badge._id.toString(),
    empName: badge.empName,
    empId: badge.empId,
    badgeNumber: badge.badgeNumber,
    issueDate: badge.issueDate.toISOString(),
    status: badge.status,
  }));

  return (
    <main className="container mx-auto py-6 space-y-6">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight">Badge Management</h1>
        <p className="text-muted-foreground">
          Issue and manage temporary employee badges
        </p>
      </div>
      <Separator />
      <div className="grid gap-6">
        <BadgeForm />
        <BadgeList badges={serializedBadges} />
      </div>
      <Toaster />
    </main>
  );
}
