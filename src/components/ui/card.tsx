import { CardHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends CardHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-white shadow rounded-md p-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
