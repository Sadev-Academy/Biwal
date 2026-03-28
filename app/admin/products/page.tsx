import React from "react";
import { prisma } from "@/lib/prisma";
import { Package, Plus, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { AdminService } from "@/lib/services/AdminService";

const AdminProductsPage = async () => {
  const storeId = await AdminService.getAdminStoreIdOrThrow();

  const products = await prisma.product.findMany({
    where: { storeId },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-[#212121]">Products</h1>
          <p className="text-[#707072] text-sm mt-1">Manage your store's inventory.</p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary" className="text-[10px] uppercase tracking-widest font-bold py-3 pr-6">
            <Plus size={16} className="mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-sm border border-[#E5E5E5] shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#F9F9F9] border-b border-[#E5E5E5]">
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Product</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Category</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Price</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E5]">
            {products.map((product: any) => (
              <tr key={product.id} className="hover:bg-[#F9F9F9] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 relative bg-[#F5F5F5] overflow-hidden rounded-sm">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#212121]">{product.name}</p>
                      <p className="text-[10px] text-[#707072] truncate max-w-[200px]">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-[#212121]">{product.category.name}</td>
                <td className="px-6 py-4 text-sm font-bold text-[#212121]">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-xs space-x-4">
                  <Link href={`/admin/products/${product.id}`} className="text-[#212121] hover:text-[#707072] transition-colors">
                    <Edit size={16} />
                  </Link>
                  <button className="text-red-500 hover:text-red-700 transition-colors">
                    <Trash2 size={16} />
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

export default AdminProductsPage;
