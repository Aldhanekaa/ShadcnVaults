import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, AlertCircle, Home, Search } from "lucide-react";
import { getBlockCategories, getBlockById } from "@/lib/block-utils";
import { staticBlocksWithComponents } from "@/lib/static-block-data";
import { BlockDetailsClient } from "@/components/block-details-client";
import { promises as fs } from "fs";
import path from "path";

interface BlockPageProps {
  params: Promise<{
    blockId: string;
    category: string;
  }>;
}

// Generate static params for all blocks - explicitly typed and exported
export async function generateStaticParams(): Promise<{ blockId: string }[]> {
  const blockIds = Object.keys(staticBlocksWithComponents);
  return blockIds.map((blockId) => ({
    blockId,
  }));
}

// Function to get component source code
async function getComponentSourceCode(blockId: string): Promise<string | null> {
  try {
    const fullPath = path.join(
      process.cwd(),
      `src/blocks/${blockId.split("-")[0]}/${blockId}.tsx`
    );
    const sourceCode = await fs.readFile(fullPath, "utf8");

    // Remove the metadata export and clean up the code for display
    const cleanedCode = sourceCode
      .replace(/export const metadata = \{[\s\S]*?\};\s*\n/g, "")
      .replace(/^"use client"\s*\n/g, "")
      .trim();

    return cleanedCode;
  } catch (error) {
    console.error("Error reading component source:", error);
    return null;
  }
}

export default async function BlockPage({ params }: BlockPageProps) {
  const resolvedParams = await params;
  const blockWithComponent = await getBlockById(resolvedParams.blockId);

  // If block doesn't exist, show custom not found page
  if (!blockWithComponent) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blocks
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="font-semibold">Component Not Found</h1>
                <p className="text-sm text-muted-foreground">
                  Block does not exist
                </p>
              </div>
            </div>

            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/shadcn/ui"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </header>

        {/* Not Found Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <div className="mx-auto w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight">
                  Component Not Found
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  The block component{" "}
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                    "{resolvedParams.blockId}"
                  </code>{" "}
                  does not exist in our library.
                </p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-6 max-w-lg mx-auto">
              <div className="flex items-start gap-3 mb-4">
                <Search className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium mb-2">This could happen if:</p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• The block ID is misspelled or incorrect</li>
                    <li>• The component hasn't been implemented yet</li>
                    <li>• The block has been moved or renamed</li>
                    <li>• You're using an outdated link</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Browse All Blocks
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/#hero">View Hero Blocks</Link>
              </Button>
            </div>

            <div className="pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                Looking for a specific component? Check our{" "}
                <Link
                  href="/"
                  className="text-primary hover:underline font-medium"
                >
                  complete block library
                </Link>{" "}
                or{" "}
                <a
                  href="https://github.com/shadcn/ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  contribute on GitHub
                </a>
                .
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Find the category for this block
  const categories = await getBlockCategories();
  let currentCategory = null;

  for (const category of categories) {
    if (category.blocks) {
      const block = category.blocks.find(
        (b) => b.id === resolvedParams.blockId
      );
      if (block) {
        currentCategory = category;
        break;
      }
    }
  }

  // If category not found, this shouldn't happen but handle gracefully
  if (!currentCategory) {
    currentCategory = {
      id: "unknown",
      title: "Unknown",
      description: "Unknown category",
    };
  }

  // Get the actual source code
  const sourceCode = await getComponentSourceCode(resolvedParams.blockId);

  const BlockComponent = blockWithComponent.component;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blocks
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="font-semibold">{blockWithComponent.name}</h1>
              <p className="text-sm text-muted-foreground">
                {currentCategory.title} Block
              </p>
            </div>
          </div>

          <BlockDetailsClient currentBlock={blockWithComponent} />
        </div>
      </header>

      {/* Block Info */}
      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{currentCategory.title}</Badge>
                <Badge variant="outline">Component</Badge>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {blockWithComponent.name}
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  {blockWithComponent.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Block Preview */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-8">
          {/* Preview Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Preview</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Desktop
                </Button>
                <Button variant="ghost" size="sm">
                  Tablet
                </Button>
                <Button variant="ghost" size="sm">
                  Mobile
                </Button>
              </div>
            </div>

            {/* Block Component Render */}
            <div className="border rounded-lg overflow-hidden bg-background">
              <BlockComponent />
            </div>
          </div>

          {/* Code Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Code</h2>
              <BlockDetailsClient
                currentBlock={blockWithComponent}
                showCopyButton={true}
              />
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-2 border-b">
                <p className="text-sm font-mono">{blockWithComponent.id}.tsx</p>
              </div>
              <div className="p-4 bg-muted/30">
                <pre className="text-sm overflow-x-auto">
                  <code>
                    {sourceCode ||
                      `// ${blockWithComponent.name} Component
// Source code could not be loaded
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function ${blockWithComponent.name.replace(/\s+/g, "")}() {
  return (
    <div className="w-full">
      {/* ${blockWithComponent.description} */}
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">${blockWithComponent.name}</h2>
        <p className="text-muted-foreground mb-6">
          ${blockWithComponent.description}
        </p>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Installation Instructions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Installation</h2>
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b">
                  <p className="text-sm font-mono">Install dependencies</p>
                </div>
                <div className="p-4 bg-muted/30">
                  <pre className="text-sm">
                    <code>
                      npm install @radix-ui/react-slot class-variance-authority
                      clsx tailwind-merge lucide-react
                    </code>
                  </pre>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b">
                  <p className="text-sm font-mono">Copy component code</p>
                </div>
                <div className="p-4 bg-muted/30">
                  <p className="text-sm text-muted-foreground">
                    Copy the component code above and paste it into your
                    project. Make sure to install the required dependencies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
