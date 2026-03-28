"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { updateStoreSettings } from "@/app/actions/store-actions";
import { useRouter } from "next/navigation";

interface StoreSettingsFormProps {
  store: {
    id: string;
    name: string;
    subdomain: string;
    customDomain: string | null;
    primaryColor: string;
  };
}

export default function StoreSettingsForm({ store }: StoreSettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: store.name,
    subdomain: store.subdomain,
    primaryColor: store.primaryColor,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateStoreSettings(store.id, formData);
      router.refresh();
      alert("Settings updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm border border-[#E5E5E5] shadow-sm space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#707072]">Store Name</label>
        <input 
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-sm text-sm focus:outline-none focus:border-[#212121] transition-colors"
          placeholder="e.g. Biwal London"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#707072]">Subdomain</label>
        <div className="flex items-center">
          <input 
            type="text"
            value={formData.subdomain}
            onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
            className="flex-1 px-4 py-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-l-sm text-sm focus:outline-none focus:border-[#212121] transition-colors"
            placeholder="my-store"
            required
          />
          <span className="px-4 py-3 bg-[#F5F5F5] border border-l-0 border-[#E5E5E5] rounded-r-sm text-xs font-bold text-[#707072]">
            .biwal.com
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#707072]">Primary Color (Hex)</label>
        <div className="flex items-center space-x-4">
          <input 
            type="color"
            value={formData.primaryColor}
            onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
            className="h-10 w-20 p-1 bg-white border border-[#E5E5E5] rounded-sm cursor-pointer"
          />
          <input 
            type="text"
            value={formData.primaryColor}
            onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
            className="flex-1 px-4 py-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-sm text-sm font-mono focus:outline-none focus:border-[#212121] transition-colors"
            placeholder="#000000"
          />
        </div>
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full text-[10px] uppercase tracking-widest font-bold py-4"
          disabled={loading}
        >
          {loading ? "Saving Transitions..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
