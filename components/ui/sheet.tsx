"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

// Base primitives
export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;

// Content (drawer body)
export const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: "top" | "bottom" | "left" | "right";
  }
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPrimitive.Portal>
    {/* ✅ Solid black overlay for contrast */}
    <SheetPrimitive.Overlay className="fixed inset-0 bg-black/60 z-40" />

    {/* ✅ Drawer panel — now always fully opaque */}
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col shadow-2xl transition-transform ease-in-out duration-300",
        "bg-white dark:bg-neutral-900 text-foreground", // ✅ fully opaque light/dark
        "border-l border-border", // optional divider
        "overflow-y-auto", // allow scrolling if needed
        side === "right" && "inset-y-0 right-0 w-[450px] sm:w-[600px]",
        side === "left" && "inset-y-0 left-0 w-[450px] sm:w-[600px]",
        side === "top" && "inset-x-0 top-0 h-[60%]",
        side === "bottom" && "inset-x-0 bottom-0 h-[60%]",
        className
      )}
      {...props}
    >
      {children}

      {/* ✅ Accessibility fix to silence Radix warning */}
      <VisuallyHidden>
        <SheetPrimitive.Title>Sheet Panel</SheetPrimitive.Title>
      </VisuallyHidden>
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

// Header + text helpers
export const SheetHeader = ({ children }: { children?: React.ReactNode }) => (
  <div className="p-4 border-b border-border/40">{children}</div>
);

export const SheetTitle = ({ children }: { children?: React.ReactNode }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

export const SheetDescription = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <p className="text-sm text-muted-foreground mt-1">{children}</p>
);
