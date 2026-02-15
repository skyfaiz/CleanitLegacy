import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-white/10 placeholder:text-gray-500 focus-visible:border-[#4ADE80] focus-visible:ring-2 focus-visible:ring-[#4ADE80]/30 aria-invalid:ring-destructive/20 aria-invalid:border-destructive bg-white/5 flex field-sizing-content min-h-16 w-full rounded-xl border px-4 py-3 text-base text-gray-200 transition-all outline-none backdrop-blur-sm focus-visible:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };

