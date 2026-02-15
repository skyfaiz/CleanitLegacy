import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F14] relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#1DB954] to-[#22C55E] text-white hover:from-[#22C55E] hover:to-[#4ADE80] shadow-lg hover:shadow-[#1DB954]/30 hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-lg hover:shadow-red-500/30 hover:scale-[1.02]",
        outline:
          "border border-white/20 bg-white/5 text-gray-200 hover:bg-white/10 hover:border-[#4ADE80]/50 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]",
        secondary:
          "bg-white/10 text-gray-200 hover:bg-white/15 backdrop-blur-sm border border-white/10 hover:border-[#00F0FF]/30 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]",
        ghost:
          "hover:bg-white/10 text-gray-300 hover:text-white",
        link: "text-[#4ADE80] underline-offset-4 hover:underline hover:text-[#22C55E]",
      },
      size: {
        default: "h-10 px-5 py-2.5 has-[>svg]:px-4 rounded-xl",
        sm: "h-9 rounded-lg gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-xl px-8 has-[>svg]:px-6 text-base",
        icon: "size-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

