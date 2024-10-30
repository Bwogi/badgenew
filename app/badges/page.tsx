import clientPromise from "../lib/mongodb";
import { Badge } from "../lib/definitions";
import BadgeForm from "../ui/badge-form";
import BadgeList from "../ui/badge-list";

export default async function BadgesPage() {
  const client = await clientPromise;
  const db = client.db("badge-management");
  const badges = (await db
    .collection("badges")
    .find({})
    .sort({ issueDate: -1 })
    .toArray()) as Badge[];

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Temporary Badge Management</h1>
      <div className="grid gap-6">
        <BadgeForm />
        <BadgeList badges={badges} />
      </div>
    </main>
  );
}
