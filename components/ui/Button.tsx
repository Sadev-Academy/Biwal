import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-xs";
  
  const variants = {
    primary: "bg-[#212121] text-white hover:bg-black",
    secondary: "bg-[#F5F5F5] text-[#212121] hover:bg-[#E5E5E5]",
    outline: "border border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white",
    ghost: "text-[#212121] hover:bg-[#F5F5F5]",
  };

  const sizes = {
    sm: "px-4 py-2",
    md: "px-8 py-3",
    lg: "px-10 py-4",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
