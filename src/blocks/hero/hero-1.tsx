"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const metadata = {
  name: "Simple Hero",
  description: "Clean hero with title and CTA button",
  link: "#",
  video:
    "https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0",
  id: "hero-1",
};

export function HeroBlock1() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Build Amazing
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {" "}
                Websites{" "}
              </span>
              Faster
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Create stunning, responsive websites with our modern components
              and templates. Perfect for startups, agencies, and developers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="gap-2 px-8">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2 px-8">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">99%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
