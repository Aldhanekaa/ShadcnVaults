"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Eye, Code, ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Block {
  name: string;
  description: string;
  link: string;
  video?: string;
  photo?: string;
  id: string;
}

interface BlocksSectionProps {
  section: {
    id: string;
    title: string;
    count?: number;
    description: string;
    blocks?: Block[];
  };
}

export function BlocksSection({ section }: BlocksSectionProps) {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  const copyToClipboard = (block: Block) => {
    // In a real implementation, this would copy the actual component code
    navigator.clipboard.writeText(
      `// ${block.name} component code would be here`
    );
    toast("Code copied!", {
      description: `${block.name} component code copied to clipboard.`,
    });
  };

  const previewBlock = (block: Block) => {
    if (block.link && block.link !== "#") {
      window.open(block.link, "_blank");
    } else {
      toast("Preview", {
        description: `Opening preview for ${block.name}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {section.title}
            </h1>
            {section.count && (
              <Badge variant="secondary" className="text-sm">
                {section.count}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{section.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {section.blocks?.map((block, id) => (
          <Card
            key={`${block.id}-${id}`}
            className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden"
            onMouseEnter={() => setHoveredBlock(block.id)}
            onMouseLeave={() => setHoveredBlock(null)}
          >
            <CardContent className="p-0">
              {/* Media Preview Area */}
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted border-b">
                {block.video ? (
                  <div className="relative w-full h-full">
                    <video
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay={hoveredBlock === block.id}
                      poster={block.photo}
                    >
                      <source src={block.video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-white/90 rounded-full p-3">
                        <Play className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                ) : block.photo ? (
                  <div className="relative w-full h-full">
                    <img
                      src={block.photo}
                      alt={block.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary/20 rounded"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-primary/20 rounded w-20 mx-auto"></div>
                        <div className="h-2 bg-primary/10 rounded w-16 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hover Actions Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    asChild
                    className="gap-2 bg-white/90 hover:bg-white text-black"
                  >
                    <Link href={`/block/${block.id}`}>
                      <ExternalLink className="h-4 w-4" />
                      View Block
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => copyToClipboard(block)}
                    className="gap-2 bg-white/90 hover:bg-white text-black"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                </div>

                {/* Media Type Indicator */}
                {block.video && (
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    Video
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                  {block.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {block.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {(!section.blocks || section.blocks.length === 0) && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Code className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">
            {section.title} blocks are being prepared and will be available
            soon.
          </p>
        </div>
      )}
    </div>
  );
}
