"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Zap, Shield, Users, BarChart } from "lucide-react";

export const metadata = {
  id: "feature-3",
  name: "Feature Grid",
  description:
    "A grid layout showcasing multiple features with icons and badges",
  link: "/block/feature-3",
};

export function FeatureBlock3() {
  const features = [
    {
      icon: Code,
      title: "Developer Tools",
      description:
        "Advanced code editor with syntax highlighting, auto-completion, and debugging tools.",
      badge: "Popular",
      badgeVariant: "default" as const,
    },
    {
      icon: Palette,
      title: "Design System",
      description:
        "Pre-built components and design tokens for consistent, beautiful user interfaces.",
      badge: "New",
      badgeVariant: "secondary" as const,
    },
    {
      icon: Zap,
      title: "Performance",
      description:
        "Optimized builds with code splitting, lazy loading, and automatic optimization.",
      badge: "Fast",
      badgeVariant: "outline" as const,
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "Built-in security features including HTTPS, CSRF protection, and secure headers.",
      badge: "Secure",
      badgeVariant: "destructive" as const,
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Real-time collaboration tools for teams with role-based access control.",
      badge: "Team",
      badgeVariant: "secondary" as const,
    },
    {
      icon: BarChart,
      title: "Analytics",
      description:
        "Comprehensive analytics and monitoring with custom dashboards and alerts.",
      badge: "Insights",
      badgeVariant: "outline" as const,
    },
  ];

  return (
    <section className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Features for Modern Development
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Everything you need to build, deploy, and scale your applications
            with confidence and ease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant={feature.badgeVariant}>{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{feature.description}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full group-hover:bg-primary/10"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="gap-2">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
}
