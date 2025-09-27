import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseClasses =
      "font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-black";

    const variants = {
      primary: "bg-black text-white hover:bg-gray-800",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    };

    const sizes = {
      sm: "px-3 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
