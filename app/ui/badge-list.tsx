"use client";

import { Badge } from "../lib/definitions";
import { updateBadgeStatus } from "../lib/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function BadgeList({ badges }: { badges: Badge[] }) {
  const { toast } = useToast();

  async function handleStatusUpdate(id: string) {
    try {
      await updateBadgeStatus(id);
      toast({
        title: "Badge Updated",
        description: "Badge has been marked as returned.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update badge status.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Badge Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Badge Number</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {badges.map((badge) => (
                <TableRow key={badge.id}>
                  <TableCell>{badge.empName}</TableCell>
                  <TableCell>{badge.empId}</TableCell>
                  <TableCell>{badge.badgeNumber}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {new Date(badge.issueDate).toLocaleDateString()}
                        </TooltipTrigger>
                        <TooltipContent>
                          {new Date(badge.issueDate).toLocaleString()}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell
                    className={
                      badge.status === "not returned"
                        ? "text-red-500 font-medium"
                        : "text-green-500 font-medium"
                    }
                  >
                    {badge.status}
                  </TableCell>
                  <TableCell>
                    {badge.status === "not returned" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(badge.id)}
                      >
                        Mark as Returned
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
