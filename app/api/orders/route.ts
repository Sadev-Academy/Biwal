import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { items, totalAmount } = body;

    if (!items || items.length === 0) {
      return new NextResponse("No items in order", { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount,
        status: "pending",
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
