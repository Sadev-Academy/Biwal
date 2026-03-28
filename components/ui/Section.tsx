import React from "react";

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  className = "",
  dark = false,
  id,
}) => {
  return (
    <section id={id} className={`py-20 ${dark ? "bg-[#212121] text-white" : "bg-white text-[#212121]"} ${className}`}>
      {(title || subtitle) && (
        <div className="text-center mb-12 px-4">
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          {subtitle && <p className={`max-w-2xl mx-auto text-lg ${dark ? "text-gray-400" : "text-[#707072]"}`}>{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;
