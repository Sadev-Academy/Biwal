import { auth } from "@/auth";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { OrderService } from "@/lib/services/OrderService";
import { ErrorService } from "@/lib/services/ErrorService";
import { StoreService } from "@/lib/services/StoreService";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const store = await StoreService.getActiveStore();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const body = await req.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return new NextResponse("No items in order", { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: any) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name}${item.selectedSize ? ` (${item.selectedSize})` : ""}`,
          images: [item.image.startsWith("http") ? item.image : `${process.env.NEXT_PUBLIC_APP_URL}${item.image}`],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
    }));

    const totalAmount = items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);

    // 1. Create Stripe checkout session first to have the ID
    // In a multi-tenant setup, we could use different Stripe accounts here
    const stripeSession = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?canceled=true`,
      metadata: {
        userId: session.user.id,
        storeId: store.id,
        storeName: store.name,
      },
    });

    // 2. Create the order with stock reservation and link to the session
    await OrderService.createOrder({
      userId: session.user.id,
      totalAmount,
      stripeSessionId: stripeSession.id,
      items: items.map((item: any) => ({
        productId: item.id,
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error: any) {
    await ErrorService.logError(error, { context: "Stripe Checkout" });
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}
