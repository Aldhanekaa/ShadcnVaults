"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function HeroBlock3() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center text-white">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Zap className="h-4 w-4 text-yellow-300" />
            <span className="text-sm">Lightning Fast Performance</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              The Future of
              <span className="text-yellow-300"> Web Development </span>
              is Here
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 md:text-xl">
              Experience next-generation tools and frameworks that make building
              beautiful, fast websites effortless and enjoyable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="gap-2 px-8 bg-white text-purple-600 hover:bg-white/90"
            >
              Get Started Now
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-8 border-white text-white hover:bg-white/10"
            >
              View Examples
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 max-w-md">
            <div className="text-center">
              <div className="text-2xl font-bold">500ms</div>
              <div className="text-sm text-white/80">Load Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-white/80">Lighthouse</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-white/80">Downtime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
