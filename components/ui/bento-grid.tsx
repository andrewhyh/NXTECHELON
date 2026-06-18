import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-background border border-border",
        // soft inner glow toward the Signal accent — flat-by-default surface
        // with one subtle atmospheric depth, not a gradient face.
        "shadow-[0_-20px_80px_-20px_oklch(0.74_0.165_55_/_0.08)_inset]",
        "transition-colors duration-300 hover:border-signal/40",
        className,
      )}
      {...props}
    >
      <div>{background}</div>

      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        <Icon
          className="h-10 w-10 origin-left transform-gpu text-foreground transition-all duration-300 ease-out group-hover:scale-75 group-hover:text-signal"
          strokeWidth={1.4}
        />
        <h3 className="font-serif text-2xl font-medium leading-[1.05] text-foreground">
          {name}
        </h3>
        <p className="max-w-lg text-sm leading-[1.55] text-muted-foreground">
          {description}
        </p>
      </div>

      {href && cta && (
        <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="pointer-events-auto h-9 px-3 text-foreground"
          >
            <a href={href}>
              {cta}
              <ArrowRight className="ms-2 h-4 w-4" strokeWidth={1.75} />
            </a>
          </Button>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-foreground/[0.02]" />
    </div>
  );
}
