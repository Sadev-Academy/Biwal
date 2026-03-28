import React from "react";
import Link from "next/link";
import Container from "./ui/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { label: "All Products", href: "/products" },
        { label: "Our Story", href: "/#story" },
        { label: "Reviews", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Shipping Policy", href: "/shipping" },
        { label: "Returns & Exchanges", href: "/returns" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-[#F5F5F5] pt-24 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-24">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-black tracking-tighter text-[#212121]">
              BIWAL
            </Link>
            <p className="text-sm text-[#707072] leading-relaxed max-w-xs font-medium">
              Premium, sustainable essentials designed for the modern minimalist. Crafting comfort with a conscience.
            </p>
            <div className="flex space-x-4">
              {/* Simple Social Icons Placeholder */}
              <div className="h-8 w-8 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer hover:bg-[#212121] hover:text-white transition-colors">
                <span className="text-[10px] font-bold">IG</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer hover:bg-[#212121] hover:text-white transition-colors">
                <span className="text-[10px] font-bold">TW</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#212121]">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-xs font-bold text-[#707072] hover:text-[#212121] transition-colors tracking-wide underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#F5F5F5] flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9D9D9]">
          <p>© {currentYear} BIWAL STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <span className="text-[#707072]">DESIGNED FOR THE CONSCIOUS</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
