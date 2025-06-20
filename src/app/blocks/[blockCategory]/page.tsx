import { BlocksSection } from "@/components/layout/blocks-section";
import SidebarLayout from "@/components/layout/sidebar-layout";
import { getBlockCategories, getBlockCategory } from "@/lib/block-utils";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface BlockCategoryPageProps {
  params: Promise<{
    blockCategory: string;
  }>;
}
export default async function BlockCategoryPage({
  params,
}: BlockCategoryPageProps) {
  const resolvedParams = await params;
  const categoryData = await getBlockCategory(resolvedParams.blockCategory);
  const blockCategories = getBlockCategories();

  if (categoryData == undefined) {
    redirect("/");
  }

  return (
    <SidebarLayout blockCategories={blockCategories}>
      <BlocksSection section={categoryData} />
    </SidebarLayout>
  );
}
