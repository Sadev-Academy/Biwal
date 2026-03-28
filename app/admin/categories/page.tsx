import React from "react";
import { prisma } from "@/lib/prisma";
import { Tag, Plus, Trash2 } from "lucide-react";
import { AdminService } from "@/lib/services/AdminService";
import Link from "next/link";
import Button from "@/components/ui/Button";

const AdminCategoriesPage = async () => {
  const storeId = await AdminService.getAdminStoreIdOrThrow();

  const categories = await prisma.category.findMany({
    where: { storeId },
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-[#212121]">Categories</h1>
          <p className="text-[#707072] text-sm mt-1">Organize your products with categories.</p>
        </div>
        <Link href="/admin/categories/new">
          <Button variant="primary" className="text-[10px] uppercase tracking-widest font-bold py-3 pr-6">
            <Plus size={16} className="mr-2" />
            Add Category
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-sm border border-[#E5E5E5] shadow-sm overflow-hidden max-w-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#F9F9F9] border-b border-[#E5E5E5]">
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Category Name</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Products Count</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-[#707072]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E5]">
            {categories.map((category: any) => (
              <tr key={category.id} className="hover:bg-[#F9F9F9] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Tag size={16} className="text-[#707072]" />
                    <span className="text-sm font-bold text-[#212121]">{category.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-[#707072]">{category._count.products} products</td>
                <td className="px-6 py-4 text-xs space-x-4">
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

export default AdminCategoriesPage;
