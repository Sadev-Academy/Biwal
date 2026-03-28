import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || (session.user as { role?: string }).role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, image, categoryId } = body;

    if (!name || !description || !price || !image || !categoryId) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
        categoryId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
