"use client";

import { Menu, Blocks, Github, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import CommandPalette from "../command-palette-navigation";
import React from "react";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [openCommandPalette, setOpenCommandPalette] = React.useState(false);

  return (
    <React.Fragment>
      <CommandPalette
        open={openCommandPalette}
        setOpen={setOpenCommandPalette}
      />

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden flex-shrink-0"
              onClick={onMenuClick && onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                  <Blocks className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <h1 className="text-base sm:text-lg font-bold truncate">
                      ShadCN Vaults
                    </h1>
                  </div>
                  <p className="text-xs text-muted-foreground hidden sm:block truncate">
                    Extra component library
                  </p>
                </div>
              </div>
            </Link>

            <motion.button
              onClick={() => setOpenCommandPalette(true)}
              transition={{ delay: 0.3 }}
              // variant="outline"
              className="cursor-pointer group inline-flex transition duration-300 h-9 w-fit rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20"
            >
              <span className="flex grow items-center">
                <Search
                  className="-ms-1 me-3 text-muted-foreground/80"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="font-normal text-muted-foreground/70">
                  Search Blocks/Components
                </span>
              </span>
              <kbd className="-me-1 ms-7 group-hover:ms-20 transition-all duration-300 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                ⌘K
              </kbd>
            </motion.button>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Link
              href="https://github.com/Aldhanekaa/ShadcnVaults"
              target="_blank"
            >
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 hidden md:flex"
              >
                <Star className="h-4 w-4" />
                <span className="hidden lg:inline">Star on GitHub</span>
                <span className="lg:hidden">Star</span>
              </Button>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}
