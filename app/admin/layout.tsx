import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Tag, 
  Settings,
  ArrowLeft 
} from "lucide-react";
import { AdminService } from "@/lib/services/AdminService";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await AdminService.getAdminStore();

  if (!store) {
    // If no store, redirect to a setup or just show limited UI
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
        <div className="p-8 bg-white border border-[#E5E5E5] text-center max-w-md">
          <h2 className="text-2xl font-black mb-4">No Store Found</h2>
          <p className="text-[#707072] mb-6">You don&apos;t have an active store associated with your account.</p>
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-[#212121] underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E5E5E5] flex flex-col">
        <div className="p-6 border-b border-[#E5E5E5] flex flex-col">
          <Link href="/" className="text-xl font-bold tracking-tighter text-[#212121]">
            {store.name.toUpperCase()}
          </Link>
          <p className="text-[10px] font-bold text-[#707072] mt-1 uppercase tracking-widest">Store Admin</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin" 
            className="flex items-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#707072] hover:bg-[#F5F5F5] hover:text-[#212121] transition-all rounded-sm"
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </Link>
          <Link 
            href="/admin/products" 
            className="flex items-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#707072] hover:bg-[#F5F5F5] hover:text-[#212121] transition-all rounded-sm"
          >
            <Package size={18} />
            <span>Products</span>
          </Link>
          <Link 
            href="/admin/orders" 
            className="flex items-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#707072] hover:bg-[#F5F5F5] hover:text-[#212121] transition-all rounded-sm"
          >
            <ShoppingBag size={18} />
            <span>Orders</span>
          </Link>
          <Link 
            href="/admin/categories" 
            className="flex items-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#707072] hover:bg-[#F5F5F5] hover:text-[#212121] transition-all rounded-sm"
          >
            <Tag size={18} />
            <span>Categories</span>
          </Link>
          <Link 
            href="/admin/settings" 
            className="flex items-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#707072] hover:bg-[#F5F5F5] hover:text-[#212121] transition-all rounded-sm"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-[#E5E5E5]">
          <Link 
            href="/" 
            className="flex items-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-[#707072] hover:text-[#212121] transition-all"
          >
            <ArrowLeft size={18} />
            <span>Back to Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-4">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
