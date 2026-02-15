import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-gray-500 selection:bg-[#1DB954] selection:text-white bg-white/5 border-white/10 flex h-10 w-full min-w-0 rounded-xl border px-4 py-2.5 text-base text-gray-200 transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm backdrop-blur-sm",
        "focus-visible:border-[#4ADE80] focus-visible:ring-2 focus-visible:ring-[#4ADE80]/30 focus-visible:bg-white/10",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

