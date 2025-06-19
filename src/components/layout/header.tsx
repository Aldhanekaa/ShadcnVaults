"use client";

import { Menu, Blocks, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden flex-shrink-0"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
              <Blocks className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <h1 className="text-base sm:text-lg font-bold truncate">
                  ShadCN Blocks
                </h1>
                <Badge
                  variant="secondary"
                  className="text-xs px-1.5 py-0.5 sm:px-2 hidden xs:inline-flex"
                >
                  631
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block truncate">
                Extra component library
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <Button variant="ghost" size="sm" className="gap-2 hidden md:flex">
            <Star className="h-4 w-4" />
            <span className="hidden lg:inline">Star on GitHub</span>
            <span className="lg:hidden">Star</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/shadcn/ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
