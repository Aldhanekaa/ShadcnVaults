"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { PropsWithChildren } from "react";

export default function DotsBackground({
  children,
  className,
  containerClassName,
}: PropsWithChildren & {
  className?: string;
  containerClassName?: string;
}) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouse({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const dotPattern = (color: string) => ({
    backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    backgroundSize: "16px 16px",
  });

  return (
    <div
      className={cn(
        "relative h-[40rem] pb-10 pt-3 px-10 bg-white dark:bg-black justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouse}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={dotPattern("rgb(212 212 212)")}
      ></div>
      <div
        className="absolute inset-0 dark:opacity-70 opacity-0 pointer-events-none"
        style={dotPattern("rgb(38 38 38)")} // neutral-800 for dark mode
      ></div>

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          ...dotPattern("rgb(99 102 241)"),
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
                200px circle at ${mouseX}px ${mouseY}px,
                black 0%,
transparent 100%
            )
        `,
          maskImage: useMotionTemplate`
            radial-gradient(
                200px circle at ${mouseX}px ${mouseY}px,
                black 0%,
                transparent 100%,
            )
        `,
        }}
      ></motion.div>

      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
}
