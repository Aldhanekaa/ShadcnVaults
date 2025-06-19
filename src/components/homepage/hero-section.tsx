"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Blocks,
  Copy,
  Palette,
  Zap,
  Github,
  ExternalLink,
  Star,
} from "lucide-react";
import { type BlockCategory } from "@/lib/block-utils";

interface HeroSectionProps {
  blockCategories: BlockCategory[];
}

export function HeroSection({ blockCategories }: HeroSectionProps) {
  // Filter out overview section and get only categories with blocks
  const displayCategories = blockCategories.filter(
    (category) =>
      category.id !== "overview" &&
      category.blocks &&
      category.blocks.length > 0
  );

  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      <div className="text-center space-y-6 py-16">
        <div className="flex justify-center mb-6">
          <Badge variant="outline" className="px-4 py-2 text-sm">
            <Star className="h-4 w-4 mr-2" />
            631 Extra ShadCN Blocks
          </Badge>
        </div>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          631 Extra Shadcn Blocks
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Build stunning landing and marketing pages in minutes. Copy and paste
          fully-designed, full-width sections effortlessly.
        </p>
        <div className="flex items-center justify-center gap-4 pt-6">
          <Button size="lg" className="gap-2 px-8">
            <Blocks className="h-5 w-5" />
            Browse Blocks
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="gap-2 px-8" asChild>
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              Documentation
            </a>
          </Button>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Block Categories Grid */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Block Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive collection of pre-built sections organized
            by category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((category) => {
            // Get the first block's preview image/video for the category
            const firstBlock = category.blocks?.[0];
            const previewMedia =
              firstBlock?.photo ||
              firstBlock?.video ||
              "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600";

            return (
              <Card
                key={category.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Category Header */}
                  <div className="p-4 border-b bg-muted/30">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">
                        {category.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </div>

                  {/* Preview Image */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                    {firstBlock?.video ? (
                      <video
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        poster={firstBlock.photo}
                      >
                        <source src={firstBlock.video} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={previewMedia}
                        alt={`${category.title} preview`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="gap-2 bg-white/90 hover:bg-white text-black"
                      >
                        <Blocks className="h-4 w-4" />
                        View Blocks
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center border-2">
          <CardContent className="pt-8 pb-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <Copy className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Copy & Paste</h3>
            <p className="text-muted-foreground leading-relaxed">
              Simply copy the code and paste it into your project. No complex
              setup or configuration required.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-2">
          <CardContent className="pt-8 pb-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <Palette className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Fully Customizable</h3>
            <p className="text-muted-foreground leading-relaxed">
              Built with Tailwind CSS and ShadCN/UI. Customize colors, spacing,
              and styling to match your brand.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-2">
          <CardContent className="pt-8 pb-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Production Ready</h3>
            <p className="text-muted-foreground leading-relaxed">
              All blocks are responsive, accessible, and optimized for
              production use in your applications.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to build something amazing?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start exploring our collection of blocks and build your next project
            faster than ever before.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="gap-2">
              <Github className="h-5 w-5" />
              View on GitHub
            </Button>
            <Button variant="outline" size="lg">
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
