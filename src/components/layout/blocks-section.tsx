"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Eye, Code, ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ProjectVideo from "../ui/project-video";

interface Block {
  name: string;
  description: string;
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {section.title}
            </h1>
            {section.blocks && (
              <Badge variant="secondary" className="text-sm">
                {section.blocks?.length}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{section.description}</p>
        </div>
      </div>

      <div className="grid w-full max-w-full grid-cols-1 gap-y-16 gap-x-6 sm:grid-cols-2">
        {section.blocks?.map((block, id) => (
          <div key={`${block.id}-${id}`} className="space-y-2 b">
            {block.video ? (
              <div className="relative cursor-pointer">
                <ProjectVideo src={block.video} />
              </div>
            ) : block.photo ? (
              <div className="relative aspect-video border overflow-hidden rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-200">
                <div className="absolute inset-0">
                  <div className="relative w-full h-full rounded-lg shadow-base overflow-hidden">
                    <div className="absolute inset-0">
                      <img
                        src={block.photo}
                        alt={block.name}
                        className=" w-full object-cover transition-transform duration-300 group-hover:scale-100"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-lg"></div>
                  </div>
                </div>
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

            <div className="px-1">
              <Link
                className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                href={`/block/${block.id}`}
              >
                {block.name}
                <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
              </Link>
              <p className="text-base text-zinc-600 dark:text-zinc-400">
                {block.description}
              </p>
            </div>
          </div>
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
