"use client";

import React from "react";
import { User, ShieldCheck, Copy } from "lucide-react";
import toast from "react-hot-toast";

const DemoCredentials = () => {
  const credentials = [
    {
      role: "Admin",
      email: "test@example.com",
      password: "password123",
      icon: <ShieldCheck size={16} className="text-blue-500" />,
      description: "Full access to dashboard, products, and orders.",
    },
    {
      role: "User",
      email: "jane@example.com",
      password: "password123",
      icon: <User size={16} className="text-[#212121]" />,
      description: "Standard customer experience (Cart, Checkout).",
    },
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`, {
      style: {
        fontSize: '10px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }
    });
  };

  return (
    <div className="mt-12 pt-8 border-t border-[#F5F5F5]">
      <div className="text-center mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-[#F5F5F5] text-[#707072] rounded-full">
          Showcase Access
        </span>
        <h3 className="mt-4 text-sm font-bold uppercase tracking-widest text-[#212121]">Demo Accounts</h3>
        <p className="mt-2 text-xs text-[#707072] font-medium">Use these credentials to explore the platform.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {credentials.map((cred) => (
          <div 
            key={cred.role}
            className="group relative p-4 bg-white border border-[#F5F5F5] hover:border-[#212121] transition-all duration-300 rounded-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {cred.icon}
                <span className="text-[10px] font-black uppercase tracking-widest">{cred.role}</span>
              </div>
            </div>
            
            <p className="text-[10px] text-[#707072] mb-4 leading-relaxed line-clamp-2">
              {cred.description}
            </p>

            <div className="space-y-2">
              <button 
                onClick={() => copyToClipboard(cred.email, "Email")}
                className="w-full flex items-center justify-between px-3 py-2 bg-[#FAF9F8] hover:bg-[#F5F5F5] text-[10px] font-bold text-[#212121] transition-colors group/btn"
              >
                <span className="truncate mr-2">{cred.email}</span>
                <Copy size={12} className="text-[#D9D9D9] group-hover/btn:text-[#212121] transition-colors" />
              </button>
              <button 
                onClick={() => copyToClipboard(cred.password, "Password")}
                className="w-full flex items-center justify-between px-3 py-2 bg-[#FAF9F8] hover:bg-[#F5F5F5] text-[10px] font-bold text-[#212121] transition-colors group/btn"
              >
                <span>{cred.password}</span>
                <Copy size={12} className="text-[#D9D9D9] group-hover/btn:text-[#212121] transition-colors" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoCredentials;
