// app/ui/badge-form.tsx
"use client";

import { useFormStatus } from "react-dom";
import { createBadge } from "../lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
    >
      {pending ? "Issuing..." : "Issue Badge"}
    </button>
  );
}

export default function BadgeForm() {
  return (
    <form action={createBadge} className="bg-white shadow-md rounded p-6">
      <div className="grid gap-4">
        <div>
          <label
            htmlFor="empName"
            className="block text-sm font-medium text-gray-700"
          >
            Employee Name
          </label>
          <input
            type="text"
            id="empName"
            name="empName"
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="empId"
            className="block text-sm font-medium text-gray-700"
          >
            Employee ID
          </label>
          <input
            type="text"
            id="empId"
            name="empId"
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="badgeNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Badge Number
          </label>
          <input
            type="text"
            id="badgeNumber"
            name="badgeNumber"
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
          />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
