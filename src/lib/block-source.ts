import { promises as fs } from "fs";
import path from "path";
import type { BlockDependencies } from "@/components/layout/block-item";

export async function getBlockSourceCode(
  blockId: string
): Promise<string | null> {
  try {
    const fullPath = path.join(
      process.cwd(),
      `src/vaults/blocks/${blockId.split("-")[0]}/${blockId}.tsx`
    );
    const sourceCode = await fs.readFile(fullPath, "utf8");
    return sourceCode
      .replace(/export const metadata = \{[\s\S]*?\};\s*\n/g, "")
      .replace(/^"use client"\s*\n/g, "")
      .trim();
  } catch {
    return null;
  }
}

export function parseBlockDependencies(sourceCode: string): BlockDependencies {
  const externalLibraries: string[] = [];
  const localComponents: string[] = [];
  const shadcnComponents: string[] = [];

  // Match static imports
  const importRegex =
    /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"`]([^'"`]+)['"`]/g;

  let match;
  while ((match = importRegex.exec(sourceCode)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith("./") || importPath.startsWith("../")) continue;
    if (importPath.includes("@/components/ui/")) {
      const componentName = importPath.split("/").pop() || "";
      if (componentName && !shadcnComponents.includes(componentName))
        shadcnComponents.push(componentName);
    } else if (importPath.startsWith("@/") || importPath.startsWith("~/")) {
      const componentPath = importPath.replace(/^[@~]/, "");
      if (!localComponents.includes(componentPath))
        localComponents.push(componentPath);
    } else if (!importPath.startsWith(".") && !importPath.startsWith("/")) {
      const packageName = importPath.split("/")[0];
      const mainPackage = packageName.startsWith("@")
        ? packageName + "/" + importPath.split("/")[1]
        : packageName;
      if (mainPackage && !externalLibraries.includes(mainPackage))
        externalLibraries.push(mainPackage);
    }
  }

  return {
    externalLibraries: externalLibraries.sort(),
    localComponents: localComponents.sort(),
    shadcnComponents: shadcnComponents.sort(),
  };
}

export async function getBlockWithMeta(blockId: string) {
  const sourceCode = await getBlockSourceCode(blockId);
  const dependencies = sourceCode
    ? parseBlockDependencies(sourceCode)
    : { externalLibraries: [], localComponents: [], shadcnComponents: [] };
  return { sourceCode, dependencies };
}
