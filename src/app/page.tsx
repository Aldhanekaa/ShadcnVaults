"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { BlocksSection } from "@/components/layout/blocks-section";
import { HeroSection } from "@/components/homepage/hero-section";
import { BlockCategory, staticBlockCategories } from "@/lib/static-block-data";

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blockCategories] = useState<BlockCategory[]>(staticBlockCategories);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        <Sidebar
          sections={blockCategories}
          activeSection={activeSection}
          open={sidebarOpen}
          onSectionChange={setActiveSection}
          onOpenChange={setSidebarOpen}
        />

        <main className="flex-1 lg:ml-64">
          <div className="p-6 max-w-7xl mx-auto">
            {activeSection === "overview" ? (
              <HeroSection
                onSectionChange={setActiveSection}
                onOpenChange={setSidebarOpen}
                blockCategories={blockCategories}
              />
            ) : (
              <BlocksSection
                onSectionChange={setActiveSection}
                onOpenChange={setSidebarOpen}
                section={blockCategories.find((s) => s.id === activeSection)!}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
