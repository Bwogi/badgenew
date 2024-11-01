// app/ui/badge-form.tsx
"use client";

import { useFormStatus } from "react-dom";
import { createBadge } from "../lib/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  empName: z.string().min(1, { message: "Employee name is required" }),
  empId: z.string().min(1, { message: "Employee ID is required" }),
  badgeNumber: z.string().min(1, { message: "Badge number is required" }),
});

type FormValues = z.infer<typeof formSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Issuing..." : "Issue Badge"}
    </Button>
  );
}

export default function BadgeForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      empName: "",
      empId: "",
      badgeNumber: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    formData.append("empName", values.empName);
    formData.append("empId", values.empId);
    formData.append("badgeNumber", values.badgeNumber);
    await createBadge(formData);
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue New Badge</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="empName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="empId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee ID</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="EMP123" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="badgeNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="B123" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
