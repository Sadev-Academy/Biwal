import React from "react";
import { AdminService } from "@/lib/services/AdminService";
import Container from "@/components/ui/Container";
import StoreSettingsForm from "./StoreSettingsForm";

export default async function SettingsPage() {
  const store = await AdminService.getAdminStore();

  if (!store) {
    return <div>Store not found.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter text-[#212121]">Store Settings</h1>
        <p className="text-[#707072] text-sm mt-1">Manage your store's identity and branding.</p>
      </div>

      <div className="max-w-2xl">
        <StoreSettingsForm store={store} />
      </div>
    </div>
  );
}
