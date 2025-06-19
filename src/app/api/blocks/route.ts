import { NextResponse } from "next/server";
import {
  getBlockCategories,
  getBlockById,
  getAllBlockIds,
} from "@/lib/block-utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const ids = searchParams.get("ids");

  if (id) {
    // Return a single block by ID
    const block = await getBlockById(id);
    if (!block) {
      return NextResponse.json({ error: "Block not found" }, { status: 404 });
    }
    return NextResponse.json(block);
  }

  if (ids === "all") {
    // Return all block IDs
    const allIds = await getAllBlockIds();
    return NextResponse.json(allIds);
  }

  // Default: return all categories
  const categories = await getBlockCategories();
  return NextResponse.json(categories);
}

export function POST() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export function PUT() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}

export function DELETE() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
