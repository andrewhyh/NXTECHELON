"use client";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

interface AnimatedListProps {
  className?: string;
  children: ReactNode;
  delay?: number;
  windowSize?: number;
}

/**
 * AnimatedList — items appear one-by-one and stack downward, oldest pushed
 * out of view. Used by the bento "AI receptionist" panel to make incoming
 * messages feel live without ever auto-playing audio or video.
 *
 * Key design: we keep a monotonically increasing sequence counter and key
 * every visible item by its sequence number. That makes every appearance of
 * an item globally unique, even after the underlying child list wraps
 * around — which avoids the "two children with the same key, ``" warning
 * that the original element.key approach hit when consumers passed children
 * without explicit keys (or when AnimatePresence held an exiting copy of
 * the same item that was about to re-enter).
 *
 * Honors `prefers-reduced-motion`: shows the last N items in their final
 * resting state on first paint with no interval at all.
 */
export function AnimatedList({
  className,
  children,
  delay = 1400,
  windowSize = 4,
}: AnimatedListProps) {
  const childrenArray = useMemo<ReactNode[]>(
    () => (Array.isArray(children) ? children : [children]),
    [children],
  );

  const prefersReducedMotion = useReducedMotion();

  // `seq` is a monotonic counter: 0, 1, 2, ... The current data index is
  // `seq % childrenArray.length`. The key for each visible item is its
  // sequence number, which is unique forever.
  const [seq, setSeq] = useState(() =>
    prefersReducedMotion ? Math.max(0, childrenArray.length - 1) : 0,
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (childrenArray.length === 0) return;
    const id = setInterval(() => {
      setSeq((s) => s + 1);
    }, delay);
    return () => clearInterval(id);
  }, [delay, childrenArray.length, prefersReducedMotion]);

  const visible = useMemo(() => {
    const len = childrenArray.length;
    if (len === 0) return [];
    const out: { key: number; dataIndex: number }[] = [];
    for (let i = 0; i < windowSize; i++) {
      const s = seq - i;
      if (s < 0) break;
      out.push({ key: s, dataIndex: ((s % len) + len) % len });
    }
    return out;
  }, [seq, childrenArray.length, windowSize]);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <AnimatePresence>
        {visible.map(({ key, dataIndex }) => (
          <AnimatedListItem key={key}>
            {childrenArray[dataIndex]}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  );
}

const itemVariants: Variants = {
  initial: { scale: 0.95, opacity: 0, y: -16 },
  animate: { scale: 1, opacity: 1, y: 0, originY: 0 },
  exit: { scale: 0.95, opacity: 0 },
};

function AnimatedListItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 350, damping: 36 }}
      layout
      className="mx-auto w-full"
    >
      {children}
    </motion.div>
  );
}
