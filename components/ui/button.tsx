interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "ghost";
}

export default function Button({
  children,
  size = "md",
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-3 rounded-xl font-medium transition focus:outline-none disabled:opacity-50";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2",
    lg: "px-7 py-4 text-lg",
  };

  const variants = {
    primary: "bg-cyan-400 text-black hover:bg-cyan-300",
    outline: "border border-white/20 text-white hover:bg-white/10",
    ghost: "bg-transparent text-white hover:bg-white/10",
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
