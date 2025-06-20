"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata = {
  id: "feature-2",
  name: "Feature Showcase",
  description:
    "A comprehensive feature showcase with benefits list and visual mockup",
  link: "/block/feature-2",
};

export function FeatureBlock2() {
  const features = [
    "Real-time collaboration with team members",
    "Advanced version control and branching",
    "One-click deployment to global CDN",
    "Built-in SEO optimization tools",
    "Custom domain and SSL certificates",
    "Comprehensive analytics dashboard",
    "24/7 customer support",
    "API access for custom integrations",
  ];

  return (
    <section className="w-full py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-muted-foreground">
                We've built everything you need to create, deploy, and manage
                your web applications. No more juggling multiple tools or
                services.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="gap-2">
              Get Started Today
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 p-8">
              <div className="w-full h-full bg-white dark:bg-card rounded-xl shadow-2xl p-6 space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-primary/20 rounded flex-1"></div>
                  <div className="h-8 bg-muted rounded flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
