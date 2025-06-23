"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Palette, Zap, Shield } from "lucide-react";

export const metadata = {
  id: "feature-4",
  name: "Feature Tabs",
  description:
    "Interactive tabbed feature showcase with images and detailed descriptions",
  link: "/block/feature-4",
};

export function FeatureBlock4() {
  const features = [
    {
      id: "development",
      label: "Development",
      icon: Code,
      title: "Advanced Development Tools",
      description:
        "Professional-grade development environment with everything you need to build modern applications.",
      image:
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
      points: [
        "Intelligent code completion and syntax highlighting",
        "Built-in debugging and testing tools",
        "Git integration with visual diff viewer",
        "Package management and dependency tracking",
      ],
    },
    {
      id: "design",
      label: "Design",
      icon: Palette,
      title: "Beautiful Design System",
      description:
        "Create stunning user interfaces with our comprehensive design system and component library.",
      image:
        "https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=600",
      points: [
        "Pre-built components and templates",
        "Customizable design tokens and themes",
        "Responsive design utilities",
        "Accessibility-first approach",
      ],
    },
    {
      id: "performance",
      label: "Performance",
      icon: Zap,
      title: "Lightning Fast Performance",
      description:
        "Optimized for speed with automatic performance enhancements and global CDN delivery.",
      image:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
      points: [
        "Automatic code splitting and lazy loading",
        "Image optimization and WebP conversion",
        "Global CDN with edge caching",
        "Performance monitoring and alerts",
      ],
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      title: "Enterprise-Grade Security",
      description:
        "Built-in security features to protect your applications and user data from threats.",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      points: [
        "SSL certificates and HTTPS enforcement",
        "DDoS protection and rate limiting",
        "Regular security audits and updates",
        "Compliance with GDPR and SOC 2",
      ],
    },
  ];

  return (
    <section className="w-full py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything You Need in One Platform
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Discover how our integrated features work together to streamline
            your development workflow.
          </p>
        </div>

        <Tabs defaultValue="development" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="gap-2"
              >
                <feature.icon className="h-4 w-4" />
                {feature.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                    <p className="text-lg text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {feature.points.map((point, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{point}</span>
                      </div>
                    ))}
                  </div>

                  <Button size="lg">Learn More About {feature.label}</Button>
                </div>

                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full aspect-video object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
