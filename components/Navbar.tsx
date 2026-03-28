"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./ui/Container";
import { useCart } from "@/hooks/use-cart";
import { ShoppingBag, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F5F5F5] py-4">
      <Container className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-[#212121]">
          BIWAL
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-widest uppercase">
          <Link href="/products" className="text-[#212121] hover:text-[#707072] transition-colors">
            Shop All
          </Link>
          <Link href="/#categories" className="text-[#212121] hover:text-[#707072] transition-colors">
            Categories
          </Link>
          <Link href="/#story" className="text-[#212121] hover:text-[#707072] transition-colors">
            Our Story
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            {session ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="text-[#212121] hover:text-[#707072] p-2 flex items-center space-x-2"
                >
                  <User size={20} />
                  <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-widest">{session.user?.name?.split(' ')[0]}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#F5F5F5] shadow-xl py-2 rounded-sm slide-in-top">
                    {(session.user as { role?: string }).role === "ADMIN" && (
                      <Link 
                        href="/admin" 
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-blue-600 hover:bg-[#F5F5F5] border-b border-[#F5F5F5]"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link 
                      href="/account/orders" 
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-[#212121] hover:bg-[#F5F5F5]"
                    >
                      Orders
                    </Link>
                    <button 
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-red-500 hover:bg-[#F5F5F5] flex items-center"
                    >
                      <LogOut size={14} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-[#212121] hover:text-[#707072] p-2">
                <User size={20} />
              </Link>
            )}
          </div>

          <button 
            onClick={cart.onOpen}
            className="text-[#212121] hover:text-[#707072] relative p-2"
          >
            <ShoppingBag size={20} />
            {isMounted && cart.items.length > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-[#212121] text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                {cart.items.length}
              </span>
            )}
          </button>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
