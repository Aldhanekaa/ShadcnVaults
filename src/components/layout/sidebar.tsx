"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

import { staticBlockQuantities } from "@/lib/static-block-data";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { blocksIcon as sectionIcons } from "@/lib/icons_data";
import { Blocks, X } from "lucide-react";

interface SidebarProps {
  sections: Array<{
    id: string;
    title: string;
    count?: number;
    description: string;
    blocks?: any[];
    blocksQuantity?: number;
  }>;
  activeSection: string;
  onSectionChange: (section: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Sidebar({
  sections,
  activeSection,
  onSectionChange,
  open,
  onOpenChange,
}: SidebarProps) {
  const { blockCategory } = useParams();
  const SidebarContent = ({
    showCloseButton = false,
  }: {
    showCloseButton?: boolean;
  }) => (
    <div className="flex w-full h-full flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Block Categories</h2>
            <p className="text-sm text-muted-foreground">
              Choose a category to explore
            </p>
          </div>
          {showCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          )}
        </div>
      </div>

      <div className="relative flex-1 px-3">
        <div className="space-y-1 py-4 relative">
          {sections.map((section, id) => {
            const Icon =
              sectionIcons[section.id as keyof typeof sectionIcons] || Blocks;
            const isActive =
              id == 0 && !blockCategory ? true : blockCategory === section.id;

            return (
              <Link
                key={section.id}
                href={id == 0 ? "/" : `/blocks/${section.id}`}
              >
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12 cursor-pointer",
                    isActive && "bg-secondary font-medium shadow-sm"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 text-left">{section.title}</span>
                  {section.blocksQuantity && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      {section.blocksQuantity}
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium">Total Blocks</p>
          <p className="text-2xl font-bold text-primary">
            {staticBlockQuantities}
          </p>
          <p className="text-xs text-muted-foreground">
            Ready to use components
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="relative w-full flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background mt-16">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="mt-16">
            <SidebarContent showCloseButton={true} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
