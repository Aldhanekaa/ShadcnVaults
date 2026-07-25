import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { BlockCategory } from "@/lib/static-block-data";
import { BlockItem } from "@/components/layout/block-item";
import { getBlockWithMeta } from "@/lib/block-source";

export async function HeroSection({
  displayCategories,
}: {
  displayCategories: BlockCategory[];
}) {
  // For each category, grab the first block's source + deps
  const categoriesWithPreview = await Promise.all(
    displayCategories.map(async (category) => {
      const firstBlock = category.blocks?.[0] ?? null;
      if (!firstBlock) return { category, firstBlock: null, sourceCode: null, dependencies: { externalLibraries: [], localComponents: [], shadcnComponents: [] } };
      const { sourceCode, dependencies } = await getBlockWithMeta(firstBlock.id);
      return { category, firstBlock, sourceCode, dependencies };
    })
  );

  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      <div className="text-center space-y-6 py-16">
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Shadcn Vaults
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Build stunning landing and marketing pages in minutes. Copy and paste
          fully-designed, full-width sections effortlessly.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="https://github.com/Aldhanekaa/ShadcnVaults"
            target="_blank"
          >
            <Button variant="outline" size="lg" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </Link>
        </div>
      </div>

      <Separator />

      {/* Per-category preview sections */}
      <div className="space-y-24">
        {categoriesWithPreview.map(({ category, firstBlock, sourceCode, dependencies }) => {
          if (!firstBlock) return null;

          return (
            <section key={category.id} className="space-y-6">
              {/* Section header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {category.title}
                    </h2>
                    <Badge variant="secondary" className="text-xs">
                      {category.blocks?.length ?? 0} blocks
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </div>

                <Link href={`/blocks/${category.id}`} className="shrink-0">
                  <Button variant="outline" size="sm" className="gap-2">
                    View all
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>

              {/* Preview: first block of the category */}
              <BlockItem
                block={firstBlock}
                sourceCode={sourceCode}
                dependencies={dependencies}
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
