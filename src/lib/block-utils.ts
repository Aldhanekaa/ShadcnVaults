import {
  staticBlockCategories,
  staticBlocksWithComponents,
  BlockCategory,
  BlockWithComponent,
} from "./static-block-data";

export function getBlockCategories(
  needKeywords?: boolean,
  needBlocks?: boolean
): BlockCategory[] {
  return staticBlockCategories.map((data) =>
    Object.assign({}, data, {
      blocks: needBlocks
        ? data.blocks?.map((block) => ({
            ...block,
            component: undefined,
          }))
        : undefined,
      keywords: !needKeywords ? undefined : data.keywords,
    })
  );
}

export async function getBlockCategory(
  category: string
): Promise<BlockCategory | undefined> {
  const categoryFound = staticBlockCategories.filter(
    (data) => data.id == category
  );

  let categoryData: BlockCategory | undefined = undefined;

  if (categoryFound.length != 0) {
    categoryData = categoryFound[0];
    categoryData.blocks = categoryData.blocks?.map((data) =>
      Object.assign({}, data, { component: undefined })
    );
  }

  return categoryData;
}

export async function getBlockById(
  id: string
): Promise<BlockWithComponent | null> {
  return staticBlocksWithComponents[id] || null;
}
