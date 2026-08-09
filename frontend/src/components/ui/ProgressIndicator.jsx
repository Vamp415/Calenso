import * as React from "react";
import { cn } from "../../lib/utils";

const ProgressIndicator = React.forwardRef(
  ({ className, steps, currentStep, ...props }, ref) => {
    const progress = ((currentStep + 1) / steps) * 100;
    
    return (
      <div
        ref={ref}
        className={cn("w-full", className)}
        {...props}
      >
        <div className="flex items-center justify-between mb-2">
          {Array.from({ length: steps }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }
);
ProgressIndicator.displayName = "ProgressIndicator";

export { ProgressIndicator };