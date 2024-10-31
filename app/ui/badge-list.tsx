// app/ui/badge-list.tsx
"use client";

import { Badge } from "../lib/definitions";
import { updateBadgeStatus } from "../lib/actions";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Search, CalendarDays, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  format,
  isWithinInterval,
  startOfDay,
  endOfDay,
  subDays,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { DateRange } from "react-day-picker";

export default function BadgeList({ badges }: { badges: Badge[] }) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [dateFilter, setDateFilter] = useState("all");

  const filteredBadges = badges.filter((badge) => {
    const matchesSearch =
      badge.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      badge.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      badge.badgeNumber.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesDate = true;
    const badgeDate = new Date(badge.issueDate);

    if (dateRange?.from && dateRange?.to) {
      matchesDate = isWithinInterval(badgeDate, {
        start: startOfDay(dateRange.from),
        end: endOfDay(dateRange.to),
      });
    } else if (dateFilter !== "all") {
      const today = new Date();
      switch (dateFilter) {
        case "today":
          matchesDate = isWithinInterval(badgeDate, {
            start: startOfDay(today),
            end: endOfDay(today),
          });
          break;
        case "week":
          matchesDate = isWithinInterval(badgeDate, {
            start: startOfDay(subDays(today, 7)),
            end: endOfDay(today),
          });
          break;
        case "month":
          matchesDate = isWithinInterval(badgeDate, {
            start: startOfMonth(today),
            end: endOfMonth(today),
          });
          break;
      }
    }

    return matchesSearch && matchesDate;
  });

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
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <CardTitle>Badge Records</CardTitle>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Input
                placeholder="Search badges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0.5 top-0.5 h-7 w-7 p-0"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <Select
              value={dateFilter}
              onValueChange={(value) => {
                setDateFilter(value);
                setDateRange(undefined);
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            {dateFilter === "custom" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-[240px] justify-start text-left font-normal ${
                      !dateRange && "text-muted-foreground"
                    }`}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          {searchQuery || dateFilter !== "all" ? (
            <p>
              Found {filteredBadges.length}{" "}
              {filteredBadges.length === 1 ? "result" : "results"}
            </p>
          ) : null}
        </div>
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
              {filteredBadges.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center h-24 text-muted-foreground"
                  >
                    {searchQuery || dateFilter !== "all"
                      ? "No badges found matching your criteria."
                      : "No badges available."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredBadges.map((badge) => (
                  <TableRow key={badge.id}>
                    <TableCell className="font-medium">
                      {badge.empName}
                    </TableCell>
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
