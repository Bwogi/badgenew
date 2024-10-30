"use client";

import { Badge } from "../lib/definitions";
import { updateBadgeStatus } from "../lib/actions";

export default function BadgeList({ badges }: { badges: Badge[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Badge Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Issue Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {badges.map((badge) => (
            <tr key={badge._id.toString()}>
              <td className="px-6 py-4 whitespace-nowrap">{badge.empName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{badge.empId}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {badge.badgeNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(badge.issueDate).toLocaleString()}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap ${
                  badge.status === "not returned" ? "bg-red-100" : ""
                }`}
              >
                {badge.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {badge.status === "not returned" && (
                  <button
                    onClick={() => updateBadgeStatus(badge._id.toString())}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Mark as Returned
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
