import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const surfaceVariants = cva(
  "rounded-lg transition-all duration-200",
  {
    variants: {
      variant: {
        elevated: "surface-elevated",
        flat: "surface-flat",
        bordered: "border border-border bg-card",
        glass: "glass",
        "glass-dark": "glass-dark",
        interactive: "surface-interactive",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: {
      variant: "elevated",
      padding: "md",
    },
  }
);

const Surface = React.forwardRef(
  ({ className, variant, padding, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div";
    return (
      <Comp
        className={cn(surfaceVariants({ variant, padding, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Surface.displayName = "Surface";

export { Surface, surfaceVariants };