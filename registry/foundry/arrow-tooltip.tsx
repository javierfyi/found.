"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * ArrowTooltip - A styled tooltip with an arrow indicator
 *
 * Built on Radix UI Tooltip with refined styling and
 * a clean arrow that points to the trigger element.
 *
 * @example
 * ```tsx
 * <ArrowTooltip>
 *   <ArrowTooltipTrigger>Hover me</ArrowTooltipTrigger>
 *   <ArrowTooltipContent>Tooltip content</ArrowTooltipContent>
 * </ArrowTooltip>
 * ```
 */

function ArrowTooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="arrow-tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function ArrowTooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <ArrowTooltipProvider>
      <TooltipPrimitive.Root data-slot="arrow-tooltip" {...props} />
    </ArrowTooltipProvider>
  );
}

function ArrowTooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger data-slot="arrow-tooltip-trigger" {...props} />
  );
}

function ArrowTooltipContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="arrow-tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) text-balance rounded-md bg-background px-3 py-1.5 text-xs text-foreground outline-1 outline-border",
          className,
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export {
  ArrowTooltip,
  ArrowTooltipContent,
  ArrowTooltipProvider,
  ArrowTooltipTrigger,
};
