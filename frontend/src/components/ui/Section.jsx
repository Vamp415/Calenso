import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const sectionVariants = cva(
  "w-full",
  {
    variants: {
      spacing: {
        none: "",
        sm: "space-section-sm",
        default: "space-section",
        lg: "space-section-lg",
      },
      background: {
        default: "",
        muted: "bg-muted/30",
        surface: "bg-surface",
        gradient: "gradient-bg-subtle",
      },
      minHeight: {
        none: "",
        default: "section-min-height",
        full: "section-full-height",
      },
    },
    defaultVariants: {
      spacing: "default",
      background: "default",
      minHeight: "none",
    },
  }
);

const Section = React.forwardRef(
  ({ className, spacing, background, minHeight, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "section";
    return (
      <Comp
        className={cn(sectionVariants({ spacing, background, minHeight, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";

export { Section, sectionVariants };