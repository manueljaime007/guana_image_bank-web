import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "ghost" | "glow" | "destructive";
}

export default function Button({
  children,
  size = "md",
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2 text-sm",
    lg: "px-7 py-3 text-base",
  };

  const variants = {
    primary: "bg-cyan-400 text-black hover:bg-cyan-300",
    outline: "border border-white/20 text-white hover:bg-white/10",
    ghost: "bg-transparent text-white hover:bg-white/10",
    glow: "bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:shadow-[0_0_30px_rgba(34,211,238,0.9)]",
    destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50",
  };

  return (
    <button
      {...props}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
