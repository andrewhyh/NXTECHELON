import { Fragment } from "react";
import type { CSSProperties } from "react";

/**
 * RevealWords — the headline arrives word by word on load.
 *
 * Server component, pure CSS (see `.nx-word` in globals.css). Each word gets an
 * index; the stagger is computed in CSS from that index, so there's no JS and
 * no hydration dependency.
 *
 * Two details that matter:
 *
 *  - The spaces are real text nodes BETWEEN the spans, not inside them. Words
 *    are `inline-block` (needed to transform them), and an inline-block that
 *    swallows its own trailing space breaks normal line wrapping.
 *  - Screen readers still read the heading as one continuous sentence — these
 *    are plain spans with real whitespace, not a letter/word soup.
 *
 * The animation uses `backwards` fill, so the resting state is the natural,
 * visible one. If animations never run, the text is simply there. Motion is
 * never the reason content is missing — same rule as Reveal.
 */
export function RevealWords({
  text,
  className,
  startDelay = 0,
  stagger = 42,
}: {
  text: string;
  className?: string;
  /** ms before the first word begins */
  startDelay?: number;
  /** ms between consecutive words */
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <span
      className={className}
      style={
        {
          "--w-start": `${startDelay}ms`,
          "--w-step": `${stagger}ms`,
        } as CSSProperties
      }
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="nx-word" style={{ "--w-i": i } as CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
