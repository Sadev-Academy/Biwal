import Stripe from "stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { OrderService } from "@/lib/services/OrderService";
import { EmailService } from "@/lib/services/EmailService";
import { ErrorService } from "@/lib/services/ErrorService";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: unknown) {
    await ErrorService.logError(error instanceof Error ? error : new Error(String(error)), { context: "Webhook signature verification" });
    return new NextResponse(`Webhook Error: ${error instanceof Error ? error.message : "Unknown"}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const orderId = session?.metadata?.orderId;
    const customerEmail = session?.customer_details?.email;

    if (!orderId) {
      await ErrorService.logApiError("/api/webhook", 400, "Order ID not found in metadata");
      return new NextResponse("Order ID not found in metadata", { status: 400 });
    }

    try {
      // 1. Update Order Status
      await OrderService.updateOrderStatus(session.id || "", "paid");
      
      // 2. Send Confirmation Email
      if (customerEmail) {
        await EmailService.sendOrderConfirmation(customerEmail, orderId, session.amount_total ? session.amount_total / 100 : 0);
      }
      
    } catch (error: unknown) {
      await ErrorService.logError(error instanceof Error ? error : new Error(String(error)), { orderId, sessionId: session.id });
      return new NextResponse("Error updating order", { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
