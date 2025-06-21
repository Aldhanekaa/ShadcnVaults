import BlockComponentNotFound from "@/components/block-component-not-found";
import { getBlockById } from "@/lib/block-utils";
import { staticBlocksWithComponents } from "@/lib/static-block-data";

interface BlockPageProps {
  params: Promise<{
    blockId: string;
  }>;
}

// Generate static params for all blocks - explicitly typed and exported
export async function generateStaticParams(): Promise<{ blockId: string }[]> {
  const blockIds = Object.keys(staticBlocksWithComponents);
  return blockIds.map((blockId) => ({
    blockId,
  }));
}

export default async function BlockViewPage({ params }: BlockPageProps) {
  const resolvedParams = await params;
  const blockWithComponent = await getBlockById(resolvedParams.blockId);

  // If block doesn't exist, show custom not found page
  if (!blockWithComponent) {
    return <BlockComponentNotFound blockId={resolvedParams.blockId} />;
  }
  const BlockComponent = blockWithComponent.component;

  return <BlockComponent />;
}
