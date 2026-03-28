"use client";

import React, { useEffect } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Section className="min-h-[70vh] flex items-center">
      <Container>
        <div className="max-w-xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#707072]">System Error</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#212121]">Something went <br /> wrong.</h1>
            <p className="text-[#707072] text-lg font-medium">
              An unexpected error occurred. Our team has been notified and we&apos;re working to fix it.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="primary" 
              onClick={() => reset()}
              className="px-10 py-4 text-[10px] uppercase font-black tracking-widest min-w-[200px]"
            >
              Try Again
            </Button>
            <Link 
              href="/"
              className="text-[10px] uppercase font-black tracking-widest border-b border-[#212121] pb-1 hover:text-[#707072] hover:border-[#707072] transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
