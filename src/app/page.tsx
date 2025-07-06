import { getBlockCategories } from "@/lib/block-utils";

import { HeroSection } from "@/components/homepage/hero-section";
import SidebarLayout from "@/components/layout/sidebar-layout";

export default function Home() {
  const blockCategories = getBlockCategories(false, true, true);
  // Filter out overview section and get only categories with blocks
  const displayCategories = blockCategories.filter(
    (category) =>
      category.id !== "overview" &&
      category.blocks &&
      category.blocks.length > 0
  );

  return (
    <SidebarLayout blockCategories={blockCategories}>
      <HeroSection displayCategories={displayCategories} />
    </SidebarLayout>
  );
}
