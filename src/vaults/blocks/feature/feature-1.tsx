"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Users, Smartphone, Globe, BarChart } from "lucide-react";

export const metadata = {
  name: "Feature Grid",
  description: "3-column feature grid layout",
  link: "#",
  photo:
    "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
  id: "feature-1",
};

export function FeatureBlock1() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized for speed with global CDN and edge computing for instant loading times.",
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description:
        "Enterprise-grade security with SSL certificates, DDoS protection, and regular backups.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Work together seamlessly with real-time editing, commenting, and version control.",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description:
        "Responsive design that looks perfect on all devices, from mobile to desktop.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Deploy to multiple regions worldwide with automatic scaling and load balancing.",
    },
    {
      icon: BarChart,
      title: "Analytics Built-in",
      description:
        "Track performance, user behavior, and conversion rates with detailed analytics.",
    },
  ];

  return (
    <section className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything You Need to Succeed
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Powerful features designed to help you build, deploy, and scale your
            applications with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-primary/20 transition-colors"
            >
              <CardContent className="p-6 space-y-4">
                <div className="p-3 bg-primary/10 rounded-full w-fit">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
