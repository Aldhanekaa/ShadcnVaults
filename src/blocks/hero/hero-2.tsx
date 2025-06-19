"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export function HeroBlock2() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center text-white">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">Trusted by 50,000+ companies</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Transform Your
              <span className="text-yellow-400"> Digital </span>
              Presence
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 md:text-xl">
              Elevate your brand with cutting-edge design and powerful
              functionality. Join thousands of successful businesses already
              using our platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="gap-2 px-8 bg-white text-black hover:bg-white/90"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-8 border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
