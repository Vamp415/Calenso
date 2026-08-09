import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "p-6",
        default: "p-8",
        lg: "p-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const EmptyState = React.forwardRef(
  ({ className, size, icon, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ size, className }))}
        {...props}
      >
        {icon && (
          <div className="mb-4 text-muted-foreground/50">
            {icon}
          </div>
        )}
        {title && (
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
        )}
        {description && (
          <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
        )}
        {action && action}
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";

export { EmptyState, emptyStateVariants };