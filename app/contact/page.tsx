"use client";

import React from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.", {
      style: {
        fontSize: '10px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Section className="py-24">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#707072]">Connect</p>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#212121] leading-none">
                  Get in <br /> Touch.
                </h1>
              </div>

              <div className="space-y-8 text-[#707072] text-lg font-medium leading-relaxed">
                <p>
                  Have a question about our products or your order? Our team is here to help you every step of the way.
                </p>
                
                <div className="space-y-4 pt-8 border-t border-[#F5F5F5]">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#212121]">Inquiries</h4>
                    <p className="text-sm">hello@biwalstudio.com</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#212121]">Support</h4>
                    <p className="text-sm">support@biwalstudio.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF9F8] p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-[#707072]">Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-[#D9D9D9] focus:border-[#212121] outline-none transition-colors text-sm font-bold"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-[#707072]">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-[#D9D9D9] focus:border-[#212121] outline-none transition-colors text-sm font-bold"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-[#707072]">Message</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-0 py-3 bg-transparent border-b border-[#D9D9D9] focus:border-[#212121] outline-none transition-colors text-sm font-bold resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <Button variant="primary" className="w-full py-4 text-[10px] uppercase tracking-[0.2em] font-black mt-4">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactPage;
