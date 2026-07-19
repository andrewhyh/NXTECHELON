/**
 * StatArc — the luminous bowl that cradles the evidence figures.
 *
 * Adapted from a reference site Andrew liked. Structure is theirs: a very wide
 * ellipse (rx/ry ≈ 2:1) whose interior carries a vertical gradient, a bright
 * thin rim, and two dimmer concentric echoes outside it, the whole thing masked
 * so it fades out at the left and right edges.
 *
 * The colour is deliberately NOT theirs. The reference is a cyan bowl with
 * white figures on near-black. This is a petrol bowl with oxide-orange figures
 * on the brand's own deep teal — same job (the bowl separates from the ground,
 * the figures separate from the bowl), done with the two colours the brand
 * already owns. A cyan-on-black copy would have been both off-brand and the
 * thing Andrew explicitly asked me not to take.
 *
 * Pure SVG + CSS. No JS, decorative only, and `aria-hidden` — it carries no
 * information the figures don't already state.
 *
 * The ellipse is centred at y=100 with ry=380, so it spans y=-280..480 and only
 * its lower portion is ever visible inside the 0..560 viewBox. That's what
 * produces the "bowl" read rather than a lens.
 */
export function StatArc() {
  return (
    <div
      aria-hidden
      className="nx-arc pointer-events-none absolute inset-x-0 bottom-0 top-0 -z-0 overflow-hidden"
    >
      {/* `slice` + xMidYMax: the viewBox scales to COVER the wrapper and anchors
          to the bottom centre, so the ellipse never distorts (which would make
          the crisp rim stroke uneven) and the bowl's base always sits just
          below the figures regardless of how tall the content runs. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 560"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        <defs>
          {/* Interior: nothing at the top, brand teal lifting toward the rim.
              Kept deliberately low-opacity in the upper band — the figures and
              source links sit there, and a brighter fill drops the small link
              text below AA against the lifted background. The glow lives in the
              rim, not the fill. */}
          <linearGradient id="arc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.09 200)" stopOpacity="0" />
            <stop offset="70%" stopColor="oklch(0.62 0.09 200)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="oklch(0.72 0.11 195)" stopOpacity="0.26" />
          </linearGradient>

          {/* Rim: near-white and bright at the bottom centre, dying away toward
              the edges — this left/right falloff is what sells it as light
              rather than a drawn shape. */}
          <linearGradient id="arc-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.85 0.08 195)" stopOpacity="0" />
            <stop offset="26%" stopColor="oklch(0.88 0.09 195)" stopOpacity="0.7" />
            <stop offset="50%" stopColor="oklch(0.98 0.03 195)" stopOpacity="1" />
            <stop offset="74%" stopColor="oklch(0.88 0.09 195)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.85 0.08 195)" stopOpacity="0" />
          </linearGradient>

          {/* A warm bloom low under the figures — the brand's second colour,
              and the thing that stops this reading as a teal-on-teal reference
              copy. Centred low (cy 96%) so it sits under the rim, not behind
              the text where it would lift the background. */}
          <radialGradient id="arc-warm" cx="50%" cy="96%" r="46%">
            <stop offset="0%" stopColor="oklch(0.70 0.175 50)" stopOpacity="0.26" />
            <stop offset="100%" stopColor="oklch(0.70 0.175 50)" stopOpacity="0" />
          </radialGradient>

          <filter id="arc-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="arc-softer" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" />
          </filter>

          {/* Fade the whole assembly out at both edges. */}
          <linearGradient id="arc-mask-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" />
            <stop offset="14%" stopColor="#fff" />
            <stop offset="86%" stopColor="#fff" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
          <mask id="arc-mask">
            <rect x="0" y="0" width="1440" height="560" fill="url(#arc-mask-grad)" />
          </mask>
        </defs>

        <g mask="url(#arc-mask)">
          {/* Outer echoes — furthest and faintest first. */}
          <ellipse
            cx="720" cy="100" rx="845" ry="422"
            stroke="url(#arc-rim)" strokeWidth="1.5"
            opacity="0.18" filter="url(#arc-softer)"
          />
          <ellipse
            cx="720" cy="100" rx="800" ry="400"
            stroke="url(#arc-rim)" strokeWidth="1.5"
            opacity="0.32" filter="url(#arc-soft)"
          />

          {/* The bowl itself. */}
          <ellipse cx="720" cy="100" rx="760" ry="380" fill="url(#arc-fill)" />
          <rect x="0" y="0" width="1440" height="560" fill="url(#arc-warm)" />

          {/* The rim, twice: a blurred pass for the glow, a crisp pass for the
              edge. Doing both is what makes it read as luminous instead of
              just a stroke. */}
          <ellipse
            cx="720" cy="100" rx="760" ry="380"
            stroke="url(#arc-rim)" strokeWidth="7"
            opacity="0.65" filter="url(#arc-soft)"
          />
          <ellipse
            cx="720" cy="100" rx="760" ry="380"
            stroke="url(#arc-rim)" strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}
