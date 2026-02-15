import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all overflow-hidden backdrop-blur-sm",
  {
    variants: {
      variant: {
        default:
          "border-[#1DB954]/30 bg-[#1DB954]/20 text-[#4ADE80] [a&]:hover:bg-[#1DB954]/30",
        secondary:
          "border-white/20 bg-white/10 text-gray-300 [a&]:hover:bg-white/15",
        destructive:
          "border-red-500/30 bg-red-500/20 text-red-400 [a&]:hover:bg-red-500/30",
        outline:
          "text-gray-300 border-white/20 [a&]:hover:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

