"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { BlocksSection } from "@/components/layout/blocks-section";
import { HeroSection } from "@/components/homepage/hero-section";
import { getBlockCategories, type BlockCategory } from "@/lib/block-utils";

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blockCategories, setBlockCategories] = useState<BlockCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/blocks");
        if (!res.ok) throw new Error("Failed to fetch block categories");
        const categories = await res.json();

        console.log("blockCategories", categories);
        setBlockCategories(categories);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading blocks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar
          sections={blockCategories}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
        />

        <main className="flex-1 lg:ml-64">
          <div className="p-6 max-w-7xl mx-auto">
            {activeSection === "overview" ? (
              <HeroSection blockCategories={blockCategories} />
            ) : (
              <BlocksSection
                section={blockCategories.find((s) => s.id === activeSection)!}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
