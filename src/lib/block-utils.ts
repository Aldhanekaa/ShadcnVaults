import { promises as fs } from "fs";
import path from "path";

export interface BlockMetadata {
  name: string;
  description: string;
  link: string;
  photo?: string;
  video?: string;
  id: string;
}

export interface CategoryMeta {
  title: string;
  description: string;
  id: string;
}

export interface BlockCategory {
  id: string;
  title: string;
  count?: number;
  description: string;
  blocks?: (BlockMetadata & { component: React.ComponentType })[];
}

const BLOCKS_DIR = path.join(process.cwd(), "src/blocks");

export async function getBlockCategories(): Promise<BlockCategory[]> {
  console.log("BLOCKS_DIR ,", BLOCKS_DIR);
  try {
    const categories: BlockCategory[] = [
      {
        id: "overview",
        title: "Overview",
        description: "Welcome to the ShadCN Blocks Library",
      },
    ];

    // Read all directories in the blocks folder
    const blockDirs = await fs.readdir(BLOCKS_DIR, { withFileTypes: true });

    for (const dir of blockDirs) {
      if (!dir.isDirectory()) continue;

      const categoryPath = path.join(BLOCKS_DIR, dir.name);

      try {
        // Try to read the category metadata
        const indexPath = path.join(categoryPath, "index.ts");
        let categoryMeta: CategoryMeta;

        try {
          // Dynamic import of the category metadata
          const metaModule = await import(`@/blocks/${dir.name}/index`);
          const metaKey = `${dir.name}Meta`;
          categoryMeta = metaModule[metaKey];
        } catch {
          // Fallback if no index.ts exists
          categoryMeta = {
            title: dir.name.charAt(0).toUpperCase() + dir.name.slice(1),
            description: `${dir.name} components`,
            id: dir.name,
          };
        }

        console.log("categoryPath ,", categoryPath);

        // Read all component files in the category
        const files = await fs.readdir(categoryPath);
        const componentFiles = files.filter(
          (file) => file.endsWith(".tsx") && file !== "index.ts"
        );

        const blocks: (BlockMetadata & { component: React.ComponentType })[] =
          [];

        for (const file of componentFiles) {
          const componentName = file.replace(".tsx", "");

          console.log(`WHATT  ${file} @/blocks/${dir.name}/${componentName}`);
          try {
            // Dynamic import of the component and its metadata
            const componentModule = await import(
              `@/blocks/${dir.name}/${componentName}`
            );

            console.log(`omponentModule ${JSON.stringify(componentModule)}`);

            if (componentModule.metadata) {
              // Find the component export (should be the function with the right name)
              const componentKey = Object.keys(componentModule).find(
                (key) =>
                  key !== "metadata" &&
                  typeof componentModule[key] === "function"
              );

              if (componentKey) {
                blocks.push({
                  ...componentModule.metadata,
                  component: componentModule[componentKey],
                });
              }
            }
          } catch (error) {
            console.warn(
              `Failed to load component ${dir.name}/${componentName}:`,
              error
            );
          }
        }

        if (blocks.length > 0) {
          categories.push({
            ...categoryMeta,
            count: blocks.length,
            blocks,
          });
        }
      } catch (error) {
        console.warn(`Failed to process category ${dir.name}:`, error);
      }
    }

    return categories;
  } catch (error) {
    console.error("Failed to load block categories:", error);
    return [
      {
        id: "overview",
        title: "Overview",
        description: "Welcome to the ShadCN Blocks Library",
      },
    ];
  }
}

export async function getBlockById(
  blockId: string
): Promise<(BlockMetadata & { component: React.ComponentType }) | null> {
  const categories = await getBlockCategories();

  for (const category of categories) {
    if (category.blocks) {
      const block = category.blocks.find((b) => b.id === blockId);
      if (block) {
        return block;
      }
    }
  }

  return null;
}

export async function getAllBlockIds(): Promise<string[]> {
  const categories = await getBlockCategories();
  const blockIds: string[] = [];

  for (const category of categories) {
    if (category.blocks) {
      blockIds.push(...category.blocks.map((block) => block.id));
    }
  }

  return blockIds;
}
