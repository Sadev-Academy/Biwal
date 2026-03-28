import { prisma } from "@/lib/prisma";
import Container from "@/components/ui/Container";
import { 
  ShoppingBag, 
  Package, 
  Users, 
  DollarSign 
} from "lucide-react";
import { AdminService } from "@/lib/services/AdminService";

const AdminPage = async () => {
  const storeId = await AdminService.getAdminStoreIdOrThrow();

  const productsCount = await prisma.product.count({ where: { storeId } });
  const ordersCount = await prisma.order.count({ where: { storeId } });
  
  // Total unique customers for this store
  const customersCount = await prisma.order.groupBy({
    by: ['userId'],
    where: { storeId }
  }).then((res: any[]) => res.length);

  const orders = await prisma.order.findMany({
    where: { storeId }
  });
  const totalRevenue = orders.reduce((acc: number, order: any) => acc + order.totalAmount, 0);

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      label: "Total Orders",
      value: ordersCount.toString(),
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Total Products",
      value: productsCount.toString(),
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      label: "Store Customers",
      value: customersCount.toString(),
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-[#212121]">Dashboard Overview</h1>
        <p className="text-[#707072] text-sm mt-1">Real-time statistics for your store.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-sm border border-[#E5E5E5] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-md ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#707072]">{stat.label}</p>
              <h2 className="text-2xl font-bold text-[#212121] mt-1">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-sm border border-[#E5E5E5] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E5E5E5]">
          <h3 className="font-bold text-[#212121]">Recent Activity</h3>
        </div>
        <div className="p-6">
          <p className="text-sm text-[#707072] italic">System is functioning normally. All systems operational.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
