"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Zap, Shield } from "lucide-react";

export function HeroBlock5() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-12 text-center">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Everything You Need to
              <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                {" "}
                Succeed Online{" "}
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              From design to deployment, we provide all the tools and resources
              you need to build exceptional digital experiences.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="gap-2 px-8">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-8 max-w-4xl">
            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card border">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Team Collaboration</h3>
              <p className="text-sm text-muted-foreground text-center">
                Work together seamlessly with real-time editing and commenting
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card border">
              <div className="p-3 bg-primary/10 rounded-full">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground text-center">
                Optimized for speed with global CDN and edge computing
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card border">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Enterprise Security</h3>
              <p className="text-sm text-muted-foreground text-center">
                Bank-level security with SSL, backups, and monitoring
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
