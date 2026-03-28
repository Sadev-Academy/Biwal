import React from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const UserOrdersPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Section className="min-h-screen pt-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl font-bold tracking-tighter mb-2">My Orders</h1>
            <p className="text-[#707072] text-sm italic">You have placed {orders.length} orders.</p>
          </header>

          {orders.length === 0 ? (
            <div className="py-20 text-center border-t border-[#F5F5F5]">
              <p className="text-[#707072]">You haven&apos;t placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div key={order.id} className="border border-[#F5F5F5] p-6 rounded-sm bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-[#F5F5F5]">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#707072]">Order ID</p>
                      <p className="text-sm font-mono text-[#212121]">{order.id.slice(0, 12)}...</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#707072]">Placed On</p>
                      <p className="text-sm font-medium text-[#212121]">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#707072]">Status</p>
                      <span className="inline-block px-2 py-0.5 bg-[#F5F5F5] text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {order.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-right min-w-[100px]">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#707072]">Total</p>
                      <p className="text-lg font-bold text-[#212121]">${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.orderItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-[#707072] font-semibold w-6">{item.quantity}x</span>
                          <span className="font-medium">{item.product.name}</span>
                        </div>
                        <span className="text-[#707072]">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default UserOrdersPage;
