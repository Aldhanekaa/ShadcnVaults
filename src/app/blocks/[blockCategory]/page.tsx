import { BlocksSection } from "@/components/layout/blocks-section";
import SidebarLayout from "@/components/layout/sidebar-layout";
import { getBlockCategories, getBlockCategory } from "@/lib/block-utils";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

interface BlockCategoryPageProps {
  params: Promise<{
    blockCategory: string;
  }>;
}

export async function generateMetadata(
  { params }: BlockCategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blockCategory = (await params).blockCategory;
  const blockCategoryMetadata = await getBlockCategory(blockCategory, true);

  if (blockCategoryMetadata) {
    return {
      applicationName: "ShadcnUI Vaults",
      title: `${blockCategoryMetadata.title} UI | ShadcnUI Vaults`,
      description: blockCategoryMetadata.description,
      keywords: blockCategoryMetadata?.keywords,

      // Robots directives
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },

      category: `${blockCategoryMetadata.title} UI`,
      openGraph: {
        type: "website",
        url: "https://shadcn-vaults.vercel.app",
        title: "ShadcnUI Vaults – Internal Tools UI Blocks & Components",
        description:
          "A collection of shadcn/ui components & blocks for internal tools UI",
        siteName: "ShadcnUI Vaults — Internal Tools UI Blocks & Components",
        images: blockCategoryMetadata.image
          ? [{ url: blockCategoryMetadata.image }]
          : "",
      },

      // Twitter metadata
      twitter: {
        card: "summary_large_image",
        title: `${blockCategoryMetadata.title} | ShadcnUI Vaults`,
        description: blockCategoryMetadata.description,
        images: blockCategoryMetadata.image
          ? [blockCategoryMetadata.image]
          : "",
      },
    };
  }

  return {
    title: `Block Category Found | ShadcnUI Vaults`,
    description: "This block category is nowhere to be find.",
  };
}

export default async function BlockCategoryPage({
  params,
}: BlockCategoryPageProps) {
  const resolvedParams = await params;
  const categoryData = await getBlockCategory(resolvedParams.blockCategory);
  const blockCategories = getBlockCategories(false, false, true);

  if (categoryData == undefined) {
    redirect("/");
  }

  return (
    <SidebarLayout
      blockCategories={blockCategories.map((data) =>
        Object.assign({}, data, { blocks: undefined })
      )}
    >
      <BlocksSection section={categoryData} />
    </SidebarLayout>
  );
}
