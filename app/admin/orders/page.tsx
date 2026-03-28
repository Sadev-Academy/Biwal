import React from "react";
import { prisma } from "@/lib/prisma";
import { RefreshCw } from "lucide-react";

import { AdminService } from "@/lib/services/AdminService";

const AdminOrdersPage = async () => {
  const storeId = await AdminService.getAdminStoreIdOrThrow();

  const orders = await prisma.order.findMany({
    where: { storeId },
    include: {
      user: true,
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-[#212121]">Orders</h1>
        <p className="text-[#707072] text-sm mt-1">Monitor customer transactions and statuses.</p>
      </div>

      <div className="bg-white rounded-sm border border-[#E5E5E5] shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#F9F9F9] border-b border-[#E5E5E5]">
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Order ID</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Customer</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Total</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Status</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Date</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E5]">
            {orders.map((order: { id: string; user: { name: string | null; email: string }; totalAmount: number; status: string; createdAt: Date }) => (
              <tr key={order.id} className="hover:bg-[#F9F9F9] transition-colors">
                <td className="px-6 py-4 text-xs font-mono text-[#707072]">#{order.id.slice(0, 8)}</td>
                <td className="px-6 py-4">
                  <p className="text-xs font-bold text-[#212121]">{order.user.name}</p>
                  <p className="text-[10px] text-[#707072]">{order.user.email}</p>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-[#212121]">${order.totalAmount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full ${
                    order.status === 'paid' ? 'bg-green-50 text-green-600' : 
                    order.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 
                    'bg-[#F5F5F5] text-[#707072]'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-[#707072]">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-xs space-x-4">
                  <button className="text-[#212121] hover:text-[#707072] transition-colors">
                    <RefreshCw size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
