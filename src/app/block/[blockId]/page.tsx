import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, AlertCircle, Home, Search } from "lucide-react";
import {
  getBlockCategories,
  getBlockById,
  getBlockMetadataById,
  getBlockCategory,
} from "@/lib/block-utils";
import { staticBlocksWithComponents } from "@/lib/static-block-data";
import { BlockDetailsClient } from "@/components/block-details-client";
import { promises as fs } from "fs";
import path from "path";
import { ResponsivePreview } from "@/components/responsive-preview";
import ProjectLicensePage from "@/components/license";
import React from "react";
import BlockComponentNotFound from "@/components/block-component-not-found";
import { Header } from "@/components/layout/header";
import { CodeBlock } from "@/components/codeblock";
import BlockButtons from "@/components/layout/block-buttons";
import { Metadata, ResolvingMetadata } from "next";

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

export async function generateMetadata(
  { params }: BlockPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blockId = (await params).blockId;
  const blockCategory = blockId.split("-")[0];
  const blockCategoryMetadata = await getBlockCategory(blockCategory, true);
  const blockMetaData = await getBlockMetadataById(blockId);
  // console.log(
  //   "blockMetaData",
  //   blockMetaData,
  //   blockId,
  //   blockCategoryMetadata,
  //   blockCategory
  // );

  if (blockMetaData && blockCategoryMetadata) {
    return {
      applicationName: "ShadcnUI Vaults",
      title: `${blockMetaData.name} | ShadcnUI Vaults`,
      description: blockMetaData.description,
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
        images: blockMetaData.photo ? [{ url: blockMetaData.photo }] : "",
      },

      // Twitter metadata
      twitter: {
        card: "summary_large_image",
        title: `${blockMetaData.name} | ShadcnUI Vaults`,
        description: blockMetaData.description,
        images: blockMetaData.photo ? [blockMetaData.photo] : "",
      },
    };
  }
  return {
    title: `Block Not Found | ShadcnUI Vaults`,
    description: "This block is nowhere to be find.",
  };
}

// Function to get component source code
async function getComponentSourceCode(blockId: string): Promise<string | null> {
  try {
    const fullPath = path.join(
      process.cwd(),
      `src/vaults/blocks/${blockId.split("-")[0]}/${blockId}.tsx`
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

function getSourceCodeDependencies(sourceCode: string): {
  externalLibraries: string[];
  localComponents: string[];
  shadcnComponents: string[];
} {
  const externalLibraries: string[] = [];
  const localComponents: string[] = [];
  const shadcnComponents: string[] = [];

  // Regular expression to match import statements
  const importRegex =
    /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"`]([^'"`]+)['"`]/g;

  // Regular expression to match dynamic imports
  const dynamicImportRegex = /import\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g;

  let match;
  while ((match = importRegex.exec(sourceCode)) !== null) {
    const importPath = match[1];

    // Skip relative imports that are not components
    if (importPath.startsWith("./") || importPath.startsWith("../")) {
      continue;
    }

    // Check if it's a shadcn/ui component
    if (importPath.includes("@/components/ui/")) {
      const componentName = importPath.split("/").pop() || "";
      if (componentName && !shadcnComponents.includes(componentName)) {
        shadcnComponents.push(componentName);
      }
    }
    // Check if it's a local component (not from node_modules)
    else if (importPath.startsWith("@/") || importPath.startsWith("~/")) {
      const componentPath = importPath.replace(/^[@~]/, "");
      if (!localComponents.includes(componentPath)) {
        localComponents.push(componentPath);
      }
    }
    // External library (from node_modules)
    else if (!importPath.startsWith(".") && !importPath.startsWith("/")) {
      // Extract the main package name (before the first slash)
      const packageName = importPath.split("/")[0];
      // Handle scoped packages (@scope/package)
      const mainPackage = packageName.startsWith("@")
        ? packageName + "/" + importPath.split("/")[1]
        : packageName;

      if (mainPackage && !externalLibraries.includes(mainPackage)) {
        externalLibraries.push(mainPackage);
      }
    }
  }

  // Process dynamic imports
  while ((match = dynamicImportRegex.exec(sourceCode)) !== null) {
    const importPath = match[1];

    // Skip relative imports
    if (importPath.startsWith("./") || importPath.startsWith("../")) {
      continue;
    }

    // Check if it's a shadcn/ui component
    if (importPath.includes("@/components/ui/")) {
      const componentName = importPath.split("/").pop() || "";
      if (componentName && !shadcnComponents.includes(componentName)) {
        shadcnComponents.push(componentName);
      }
    }
    // Check if it's a local component
    else if (importPath.startsWith("@/") || importPath.startsWith("~/")) {
      const componentPath = importPath.replace(/^[@~]/, "");
      if (!localComponents.includes(componentPath)) {
        localComponents.push(componentPath);
      }
    }
    // External library
    else if (!importPath.startsWith(".") && !importPath.startsWith("/")) {
      const packageName = importPath.split("/")[0];
      const mainPackage = packageName.startsWith("@")
        ? packageName + "/" + importPath.split("/")[1]
        : packageName;

      if (mainPackage && !externalLibraries.includes(mainPackage)) {
        externalLibraries.push(mainPackage);
      }
    }
  }

  return {
    externalLibraries: externalLibraries.sort(),
    localComponents: localComponents.sort(),
    shadcnComponents: shadcnComponents.sort(),
  };
}

export default async function BlockPage({ params }: BlockPageProps) {
  const resolvedParams = await params;
  const blockWithComponent = await getBlockById(resolvedParams.blockId);

  // If block doesn't exist, show custom not found page
  if (!blockWithComponent) {
    return <BlockComponentNotFound blockId={resolvedParams.blockId} />;
  }

  // Find the category for this block
  const categories = await getBlockCategories();
  let currentCategory = null;

  for (const category of categories) {
    if (category.blocks) {
      // console.log("category.blocks", category.blocks);
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

  // Get dependencies from source code
  const dependencies = sourceCode
    ? getSourceCodeDependencies(sourceCode)
    : {
        externalLibraries: [],
        localComponents: [],
        shadcnComponents: [],
      };

  return (
    <React.Fragment>
      <Header />
      {/* Header */}

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-[100rem] mx-auto">
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

          <BlockDetailsClient
            sourceCode={sourceCode}
            currentBlock={blockWithComponent}
          />
        </div>
      </header>

      {/* Block Info */}
      <div className="border-b bg-muted/30">
        <div className=" max-w-[100rem] mx-auto px-4 sm:px-6 py-8">
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

              <BlockButtons
                type="block"
                id={(await params).blockId}
                externalLibraries={dependencies.externalLibraries}
                shadcnComponents={dependencies.shadcnComponents}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Block Preview */}
      <main className="max-w-[100rem] mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-8">
          {/* Preview Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Preview</h2>
            </div>

            {/* Responsive Preview Component */}
            <ResponsivePreview
              blockId={resolvedParams.blockId}
            ></ResponsivePreview>
          </div>

          {/* Code Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Code</h2>
              <BlockDetailsClient
                sourceCode={sourceCode}
                currentBlock={blockWithComponent}
                showCopyButton={true}
              />
            </div>

            <CodeBlock
              aria-label={blockWithComponent.name}
              filename={`${blockWithComponent.id}.tsx`}
              language="tsx"
            >
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
            </CodeBlock>
          </div>

          {/* Dependencies Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Dependencies</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {/* External Libraries */}
              {dependencies.externalLibraries.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    External Libraries
                  </h3>
                  <div className="space-y-1">
                    {dependencies.externalLibraries.map((lib) => (
                      <Badge
                        key={lib}
                        variant="secondary"
                        className="text-xs mr-2"
                      >
                        {lib}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Shadcn/UI Components */}
              {dependencies.shadcnComponents.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Shadcn/UI Components
                  </h3>
                  <div className="space-y-1 flex ">
                    {dependencies.shadcnComponents.map((component) => (
                      <Badge
                        key={component}
                        variant="outline"
                        className="text-xs mr-2"
                      >
                        {component}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Local Components */}
              {dependencies.localComponents.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Local Components
                  </h3>
                  <div className="space-y-1 flex ">
                    {dependencies.localComponents.map((component) => (
                      <Badge
                        key={component}
                        variant="default"
                        className="text-xs mr-2"
                      >
                        {component}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <ProjectLicensePage />
    </React.Fragment>
  );
}
