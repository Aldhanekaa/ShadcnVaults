# Contribution Guide

Thank you for your interest in contributing to **Shadcn Vaults**! This guide will help you get started with contributing new blocks, components, utilities, or improvements.

---

## Project Structure Overview

- **src/vaults/blocks/**  
  Contains all block implementations, organized by category (e.g., `hero`, `bills`). Each block is a standalone React component (e.g., `hero-1.tsx`, `bills-2.tsx`).

- **src/components/**  
  This is the components and UI for the website, not the actualy UI library.

  - **ui/**: Reusable UI primitives (e.g., `button.tsx`, `card.tsx`, `table.tsx`).
  - **layout/**: Layout components (e.g., `sidebar.tsx`, `header.tsx`, `blocks-section.tsx`).
  - **homepage/**: Homepage-specific components (e.g., `hero-section.tsx`).

- **src/lib/**  
  Utility functions and static data (e.g., `static-block-data.ts` for block metadata and categories).

- **src/hooks/**  
  Custom React hooks.

- **src/app/**  
  Next.js app directory, including routing, global styles, and API routes.

---

## How to Contribute

### 1. Fork & Clone

- Fork the repository and clone it to your local machine.

### 2. Install Dependencies

```bash
npm install
```

### 3. Add or Update Blocks

- **To add a new block:**

  - Choose the appropriate category in `src/vaults/blocks/` (e.g., `hero`, `bills`).
  - Create a new file (e.g., `todolist-1.tsx`) following the naming convention.
    > The file name format should follow the index and the name of your block category. If it's `review form`, then you shall add your file with the name of `reviewform-1` (`1` : because it's the first block) under the folder of `src/vaults/blocks/reviewform/`
  - Export your block as a React component.
  - Add block metadata and register it in `src/lib/static-block-data.ts` under the correct category.

- **To add a new block category:**
  - Create a new folder in `src/vaults/blocks/` (e.g., `todolist/`). The folder category name should not include dash in the name `-`
  - Add your block files.
  - Update `src/lib/static-block-data.ts` to include the new category and its blocks.

### 4. Add or Update Components

- **UI components:**
  - Add to `src/components/ui/` if it's a reusable primitive.
- **Layout or shared components:**
  - Add to `src/components/layout/` or `src/components/` as appropriate.

### 5. Utilities & Hooks

- Add utility functions to `src/lib/`.
- Add custom hooks to `src/hooks/`.

### 6. Test Your Changes

- Run the development server:
  ```bash
  npm run dev
  ```
- Visit [http://localhost:3000](http://localhost:3000) to preview your changes.

### 7. Lint & Format

- Ensure your code passes linting:
  ```bash
  npm run lint
  ```
- Follow the existing code style and conventions.

### 8. Submit a Pull Request

- Push your branch and open a pull request with a clear description of your changes.

---

## Detailed Guide: Adding Blocks and Categories

### Adding a New Block

1. **Choose the Right Category Folder**

   - Navigate to `src/blocks/` and pick the appropriate category (e.g., `hero`, `bills`).
   - If your block fits an existing category, add it there. Otherwise, see the "Add a New Category" section below.

2. **Create the Block File**

   - Name your file following the pattern: `<category>-<number>.tsx` (e.g., `hero-3.tsx`, `bills-7.tsx`).
   - Place your file in the correct category folder.

3. **Block File Structure**

   - At the top, export a `metadata` object with at least: `id`, `name`, `description`, and optionally `video`, `photo`, or `link`.
   - Export your block as a React component. Example:

     ```tsx
     export function HeroBlock3() {
       return <section>...</section>;
     }
     ```

   - Use existing blocks as references for structure and style.

4. **Register the Block in `static-block-data.ts`**

   - Import your new block component at the top of `src/lib/static-block-data.ts`.
   - Add an entry to the `staticBlocksWithComponents` object, using the block's `id` as the key. Example:
     ```ts
     import { HeroBlock3 } from "@/blocks/hero/hero-3";
     // ...
     "hero-3": {
       id: "hero-3",
       name: "Fancy Hero",
       description: "A hero section with animation and CTA",
       video: "https://example.com/preview.mp4",
       component: HeroBlock3,
     },
     ```
   - Add your block to the appropriate category in the `staticBlockCategories` array:
     ```ts
     {
       id: "hero",
       title: "Hero",
       description: "...",
       blocks: [
         staticBlocksWithComponents["hero-1"],
         staticBlocksWithComponents["hero-2"],
         staticBlocksWithComponents["hero-3"], // <-- your new block
       ],
     }
     ```

5. **Preview and Test**
   - Run the dev server (`npm run dev`) and check your block in the UI.
   - Make sure the preview, metadata, and code copy features work as expected.

---

### Adding a New Block Category

1. **Create a New Folder**

   - In `src/vaults/blocks/`, create a new folder for your category (e.g., `todolist/`).

2. **Add Block Files**

   - Add one or more block files to your new folder, following the block file structure above.

3. **Export Block Components**

   - Export each block as a named React component and provide a `metadata` object.

4. **Register Blocks in `static-block-data.ts`**

   - Import your new block components at the top.
   - Add entries for each block to the `staticBlocksWithComponents` object.
   - Add a new entry to the `staticBlockCategories` array:
     ```ts
     {
       id: "todolist",
       title: "ToDo List",
       description: "Blocks for task and to-do management",
       blocks: [
         staticBlocksWithComponents["todolist-1"],
         staticBlocksWithComponents["todolist-2"],
       ],
     }
     ```
     > In the code above, you can add `video` as the preview or `image`, the video or image should be hosted via cdn, you can use Cloudinary or anything that works!

5. **Test the New Category**
   - Start the dev server and ensure your new category and blocks appear and function correctly in the UI.

---

## Tips

- **Follow existing patterns:**  
  Use current blocks and components as references for structure and style.
- **Keep components modular:**  
  Reuse UI primitives from `src/components/ui/` where possible.
- **Document your block:**  
  Add a clear name and description in the block metadata.

---

## Need Help?

If you have questions, open an issue or start a discussion. We're happy to help!
