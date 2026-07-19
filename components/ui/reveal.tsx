import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Reveal — one scroll-into-view choreography for the whole page.
 *
 * This is deliberately NOT a framer-motion component and NOT a client
 * component. The previous version used `whileInView`, which serialises
 * `opacity: 0` inline during SSR and only clears it once JS has hydrated AND
 * an IntersectionObserver has fired. Anything that renders the page without
 * completing that dance — headless renderers, link-preview and social-card
 * bots, crawlers, a slow or failed hydration — got a blank section. For a
 * marketing page whose entire job is the first impression, that's a real cost.
 *
 * Instead: the element is visible by default and the reveal is layered on top
 * via a CSS view() timeline (see `[data-reveal]` in globals.css). No JS on the
 * critical path, and browsers without `animation-timeline` support simply show
 * the finished state. The animation can only ever take something visible and
 * animate it — it can never be the reason content is missing.
 *
 * `as` matters: this component must be able to BE the semantic element rather
 * than wrap it. Wrapping an <li> in a <div> puts an invalid child inside <ol>,
 * strips the list semantics screen readers rely on, and makes every item both
 * :first-child and :last-child of its own wrapper — which silently kills
 * first:/last: styling.
 *
 * `index` staggers siblings by offsetting the animation range.
 */
export function Reveal({
  children,
  index = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      data-reveal
      className={className}
      style={{ "--reveal-i": index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
