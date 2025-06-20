"use client";

import { useState, useEffect, PropsWithChildren } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { BlocksSection } from "@/components/layout/blocks-section";
import { HeroSection } from "@/components/homepage/hero-section";
import { BlockCategory } from "@/lib/static-block-data";
import ProjectLicensePage from "../license";
import { getBlockCategories } from "@/lib/block-utils";

export default function SidebarLayout({
  children,
  blockCategories,
}: PropsWithChildren & {
  blockCategories: BlockCategory[];
}) {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            {children}
            <ProjectLicensePage />
          </div>
        </main>
      </div>
    </div>
  );
}
