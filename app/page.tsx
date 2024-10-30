// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Shield,
  Clock,
  BarChart,
  Bell,
  CheckSquare,
  Users,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Badge Management
          <span className="text-primary"> Made Simple</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
          Streamline your temporary badge issuance process with our modern,
          efficient management system.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/badges">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="container mx-auto py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to manage badges
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Secure Badge Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              Monitor badge assignments and returns with a secure, centralized
              system.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Real-time Updates</CardTitle>
            </CardHeader>
            <CardContent>
              Track badge status changes and updates in real-time with automatic
              timestamps.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              Get a clear view of all active and returned badges with visual
              indicators.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Bell className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Instant Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              Receive immediate feedback on badge issuance and return status
              changes.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckSquare className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Form Validation</CardTitle>
            </CardHeader>
            <CardContent>
              Ensure accurate data entry with built-in form validation and error
              checking.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Employee Management</CardTitle>
            </CardHeader>
            <CardContent>
              Easily manage temporary badges for employees and visitors alike.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Status Section */}
      <section className="container mx-auto py-20">
        <div className="rounded-lg bg-muted p-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <h3 className="text-3xl font-bold">Fast</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Quick badge issuance
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold">Secure</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Protected data handling
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold">Simple</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Intuitive interface
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-20">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to streamline your badge management?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Start managing your temporary badges efficiently today.
            </p>
            <Link href="/badges">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto py-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2024 Badge Management. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Badge variant="secondary">v1.0.0</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
