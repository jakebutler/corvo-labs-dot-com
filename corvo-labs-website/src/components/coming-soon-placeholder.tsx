import React from "react";

export function ComingSoonPlaceholder({ label = "Coming soon..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 rounded-lg border border-dashed border-muted-foreground/30 aspect-video">
      <span className="text-2xl md:text-3xl font-semibold text-muted-foreground/70 tracking-tight drop-shadow-sm select-none">
        {label}
      </span>
    </div>
  );
}
