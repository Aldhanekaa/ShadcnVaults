import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
import { BlockItem } from "./block-item";
import { getBlockWithMeta } from "@/lib/block-source";

interface Block {
  name: string;
  description: string;
  video?: string;
  photo?: string;
  id: string;
}

interface BlocksSectionProps {
  section: {
    id: string;
    title: string;
    count?: number;
    description: string;
    blocks?: Block[];
  };
}


export async function BlocksSection({ section }: BlocksSectionProps) {
  // Pre-fetch source code for all blocks in parallel
  const blocksWithCode = await Promise.all(
    (section.blocks ?? []).map(async (block) => {
      const { sourceCode, dependencies } = await getBlockWithMeta(block.id);
      return { block, sourceCode, dependencies };
    }),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {section.title}
            </h1>
            {section.blocks && (
              <Badge variant="secondary" className="text-sm">
                {section.blocks?.length}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{section.description}</p>
        </div>
      </div>

      <div className="grid w-full max-w-full grid-cols-1 gap-y-16 gap-x-6 ">
        {blocksWithCode.map(({ block, sourceCode, dependencies }, idx) => (
          <BlockItem
            key={`${block.id}-${idx}`}
            block={block}
            sourceCode={sourceCode}
            dependencies={dependencies}
          />
        ))}
      </div>

      {/* Empty State */}
      {(!section.blocks || section.blocks.length === 0) && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Code className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">
            {section.title} blocks are being prepared and will be available
            soon.
          </p>
        </div>
      )}
    </div>
  );
}
