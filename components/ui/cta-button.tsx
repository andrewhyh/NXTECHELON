import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/**
 * The page has exactly one primary action: book the call. This is it.
 *
 * Warm oxide fill with ink text (6.50:1 — verified). The lift on hover is a
 * transform, not a layout property. No conic beam, no glow: the button is
 * confident because it's big, warm, and unambiguous, not because it sparkles.
 */
export const CtaButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    tone?: "solid" | "quiet";
  }
>(({ className, asChild = false, tone = "solid", ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-lg px-7 text-[0.95rem] font-semibold",
        "h-[3.25rem] transition-[transform,background-color,box-shadow] duration-200 ease-out",
        "hover:-translate-y-0.5 active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        tone === "solid" &&
          "bg-signal text-ink shadow-[0_1px_0_0_oklch(1_0_0_/_0.25)_inset] hover:bg-signal/90",
        tone === "quiet" &&
          "border border-border bg-transparent text-foreground hover:border-foreground/35 hover:bg-foreground/[0.04]",
        className,
      )}
      {...props}
    />
  );
});
CtaButton.displayName = "CtaButton";
