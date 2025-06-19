import {
  staticBlockCategories,
  staticBlocksWithComponents,
  BlockCategory,
  BlockWithComponent,
} from "./static-block-data";

export async function getBlockCategories(): Promise<BlockCategory[]> {
  return staticBlockCategories;
}

export async function getBlockById(
  id: string
): Promise<BlockWithComponent | null> {
  return staticBlocksWithComponents[id] || null;
}
