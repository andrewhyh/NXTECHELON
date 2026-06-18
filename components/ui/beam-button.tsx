"use client";

import * as React from "react";

import { BorderBeam } from "@/components/ui/border-beam";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BeamButtonProps extends ButtonProps {
  beamDuration?: number;
  beamSize?: number;
  wrapperClassName?: string;
}

const BeamButton = React.forwardRef<HTMLButtonElement, BeamButtonProps>(
  (
    {
      className,
      wrapperClassName,
      beamDuration = 7.5,
      beamSize = 120,
      size = "lg",
      variant = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <span
        className={cn(
          "relative isolate inline-flex overflow-hidden rounded-[4px] p-[1.5px] align-middle",
          "bg-petrol/70",
          wrapperClassName,
        )}
      >
        <BorderBeam
          size={beamSize}
          duration={beamDuration}
          borderWidth={1.5}
          anchor={286}
          colorFrom="var(--paper)"
          colorTo="var(--petrol)"
        />
        <Button
          ref={ref}
          size={size}
          variant={variant}
          className={cn(
            "relative z-10 rounded-[3px] border border-transparent bg-signal text-ink",
            "hover:bg-signal/95",
            className,
          )}
          {...props}
        />
      </span>
    );
  },
);
BeamButton.displayName = "BeamButton";

export { BeamButton };
