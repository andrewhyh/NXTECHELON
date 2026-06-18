"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type CursorPosition = {
  left: number;
  width: number;
  opacity: number;
};

type SlideTab = string | {
  label: string;
  href: string;
};

type NormalizedTab = {
  label: string;
  href?: string;
};

type SlideTabsProps = {
  tabs?: readonly SlideTab[];
  defaultSelected?: number;
  onTabChange?: (index: number, tab: NormalizedTab) => void;
  className?: string;
};

type TabProps = {
  tab: NormalizedTab;
  selected: boolean;
  setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
  onSelect: () => void;
};

const DEFAULT_TABS = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Operator", href: "#operator" },
  { label: "Contact", href: "#contact" },
] as const;

function normalizeTab(tab: SlideTab): NormalizedTab {
  return typeof tab === "string" ? { label: tab } : tab;
}

export function SlideTabs({
  tabs = DEFAULT_TABS,
  defaultSelected = 0,
  onTabChange,
  className = "",
}: SlideTabsProps) {
  const normalizedTabs = React.useMemo(() => tabs.map(normalizeTab), [tabs]);
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = React.useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [selected, setSelected] = React.useState(defaultSelected);
  const tabsRef = React.useRef<Array<HTMLLIElement | null>>([]);

  const updateCursor = React.useCallback((index: number) => {
    const selectedTab = tabsRef.current[index];
    if (!selectedTab) return;

    const { width } = selectedTab.getBoundingClientRect();
    setPosition({
      left: selectedTab.offsetLeft,
      width,
      opacity: 1,
    });
  }, []);

  React.useLayoutEffect(() => {
    updateCursor(selected);
  }, [selected, updateCursor]);

  React.useEffect(() => {
    const updateOnResize = () => updateCursor(selected);

    window.addEventListener("resize", updateOnResize);

    return () => window.removeEventListener("resize", updateOnResize);
  }, [selected, updateCursor]);

  React.useEffect(() => {
    const syncFromHash = () => {
      const currentHash = window.location.hash || "#top";
      const hashIndex = normalizedTabs.findIndex(
        (tab) => tab.href === currentHash,
      );

      if (hashIndex >= 0) {
        setSelected(hashIndex);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [normalizedTabs]);

  return (
    <nav aria-label="Section navigation">
      <ul
        onMouseLeave={() => updateCursor(selected)}
        className={cn(
          "relative mx-auto flex w-fit list-none items-center border border-paper/15 bg-ink/88 px-2 py-1 text-paper",
          "rounded-[3px] shadow-none",
          className,
        )}
      >
        {normalizedTabs.map((tab, index) => (
          <Tab
            key={tab.href ?? tab.label}
            ref={(element) => {
              tabsRef.current[index] = element;
            }}
            tab={tab}
            selected={selected === index}
            setPosition={setPosition}
            onSelect={() => {
              setSelected(index);
              onTabChange?.(index, tab);
            }}
          />
        ))}

        <Cursor position={position} reducedMotion={Boolean(prefersReducedMotion)} />
      </ul>
    </nav>
  );
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ tab, selected, setPosition, onSelect }, ref) => {
    const localRef = React.useRef<HTMLLIElement | null>(null);

    React.useImperativeHandle(ref, () => localRef.current as HTMLLIElement);

    const measure = React.useCallback(() => {
      const element = localRef.current;
      if (!element) return;

      const { width } = element.getBoundingClientRect();

      setPosition({
        left: element.offsetLeft,
        width,
        opacity: 1,
      });
    }, [setPosition]);

    const className = cn(
      "relative z-10 block rounded-[2px] px-3 py-2 font-mono text-[0.66rem] font-medium uppercase tracking-[0.2em]",
      "text-paper/62 transition-colors duration-200 hover:text-paper focus-visible:text-paper md:px-4",
      selected && "text-paper",
    );

    return (
      <li
        ref={localRef}
        onMouseEnter={measure}
        className="relative z-10 block"
      >
        {tab.href ? (
          <a
            href={tab.href}
            aria-current={selected ? "page" : undefined}
            className={className}
            onClick={onSelect}
            onFocus={measure}
          >
            {tab.label}
          </a>
        ) : (
          <button
            type="button"
            aria-pressed={selected}
            className={className}
            onClick={onSelect}
            onFocus={measure}
          >
            {tab.label}
          </button>
        )}
      </li>
    );
  },
);
Tab.displayName = "Tab";

function Cursor({
  position,
  reducedMotion,
}: {
  position: CursorPosition;
  reducedMotion: boolean;
}) {
  return (
    <motion.li
      animate={position}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 420, damping: 34, mass: 0.8 }
      }
      className="absolute bottom-1 z-0 h-px rounded-full bg-signal"
      role="presentation"
      aria-hidden
    />
  );
}
