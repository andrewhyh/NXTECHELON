import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Recr8IntroProps = {
  brandText: string;
  navItems: string[];
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const brandFont =
  '"Century Gothic", Aileron, Montserrat, Futura, "Avenir Next", Arial, sans-serif';

const red = "#ff3131";
const navy = "#070b1d";
const ink = "#171717";
const paper = "#f4f3ef";

const AnimatedLogo = ({
  frame,
  mode,
}: {
  frame: number;
  mode: "intro" | "nav";
}) => {
  const isNav = mode === "nav";
  const textColor = isNav ? ink : "#ffffff";
  const dotSize = isNav ? 14 : 86;
  const textSize = isNav ? 31 : 112;
  const gap = isNav ? 10 : 24;
  const blinkCycle = frame % 28;
  const blinkOpacity = blinkCycle < 15 ? 1 : 0.16;
  const r8Reveal = isNav ? 1 : interpolate(frame, [42, 66], [0, 1], clamp);
  const dotGlow = isNav ? 0 : interpolate(blinkOpacity, [0.16, 1], [12, 34], clamp);
  const flickerOpacity =
    frame < 14
      ? interpolate(frame, [0, 2, 4, 7, 10, 14], [0, 1, 0.08, 0.78, 0.2, 1], clamp)
      : frame > 50 && frame < 70
        ? interpolate(frame, [50, 53, 56, 60, 70], [1, 0.44, 1, 0.72, 1], clamp)
        : 1;
  const jitter = frame < 70 && frame % 9 === 0 ? -3 : frame < 70 && frame % 13 === 0 ? 3 : 0;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap,
        opacity: flickerOpacity,
        translate: `${jitter}px 0px`,
      }}
    >
      <div
        style={{
          backgroundColor: red,
          borderRadius: 999,
          boxShadow: isNav
            ? "0 0 0 0 rgba(255, 49, 49, 0)"
            : `0 0 ${dotGlow}px rgba(255, 49, 49, 0.42)`,
          height: dotSize,
          opacity: blinkOpacity,
          width: dotSize,
        }}
      />
      <div
        style={{
          alignItems: "baseline",
          display: "flex",
          fontFamily: brandFont,
          fontSize: textSize,
          fontWeight: 500,
          letterSpacing: isNav ? -1.2 : -4,
          lineHeight: 0.9,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: isNav ? ink : red }}>REC</span>
        <span
          style={{
            color: isNav ? ink : red,
            opacity: r8Reveal,
            width: isNav ? "auto" : interpolate(r8Reveal, [0, 1], [0, 34], clamp),
          }}
        >
          .
        </span>
        <span
          style={{
            color: textColor,
            opacity: r8Reveal,
            translate: `${interpolate(r8Reveal, [0, 1], [-24, 0], clamp)}px 0px`,
            width: isNav ? "auto" : interpolate(r8Reveal, [0, 1], [0, 128], clamp),
          }}
        >
          R8
        </span>
      </div>
    </div>
  );
};

const NavBrand = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: brandFont,
        justifyContent: "center",
        lineHeight: 1,
        width: 118,
      }}
    >
      <span
        style={{
          color: red,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: -0.6,
          textTransform: "uppercase",
        }}
      >
        REC
      </span>
      <span
        style={{
          color: "#000000",
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: -2.4,
          marginTop: 2,
          textTransform: "uppercase",
        }}
      >
        REC.R8
      </span>
    </div>
  );
};

export const Recr8Intro = ({ brandText, navItems }: Recr8IntroProps) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const ease = Easing.bezier(0.2, 0.75, 0.14, 1);

  const pageReveal = interpolate(frame, [92, 112], [0, 1], clamp);
  const dock = spring({
    frame: frame - 104,
    fps,
    config: {
      damping: 24,
      mass: 0.75,
      stiffness: 100,
    },
  });

  const introScale = interpolate(dock, [0, 1], [1, 0.18], clamp);
  const introX = interpolate(dock, [0, 1], [0, -width / 2 + 94], clamp);
  const introY = interpolate(dock, [0, 1], [0, -height / 2 + 65], clamp);
  const introOpacity = interpolate(frame, [0, 8, 128, 140], [0, 1, 1, 0], clamp);
  const navOpacity = interpolate(frame, [118, 132], [0, 1], clamp);
  const heroOpacity = interpolate(frame, [116, 148], [0, 1], {
    easing: ease,
    ...clamp,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: paper,
        color: ink,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundColor: navy,
          opacity: interpolate(pageReveal, [0, 1], [1, 0], clamp),
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: introOpacity,
          scale: introScale,
          translate: `${introX}px ${introY}px`,
        }}
      >
        <AnimatedLogo frame={frame} mode="intro" />
      </AbsoluteFill>

      <div
        style={{
          alignItems: "center",
          backgroundColor: "#ebebeb",
          border: "0",
          borderRadius: 6,
          boxShadow: "none",
          display: "flex",
          gap: 42,
          height: 86,
          left: 18,
          opacity: navOpacity,
          padding: "0 22px",
          position: "absolute",
          top: 24,
          width: interpolate(frame, [118, 144], [176, 1150], clamp),
        }}
      >
        <NavBrand />
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flex: 1,
            gap: 50,
            justifyContent: "flex-start",
            opacity: interpolate(frame, [132, 146], [0, 1], clamp),
            overflow: "hidden",
          }}
        >
          {navItems.map((item, index) => (
            <span
              key={item}
              style={{
                color: "#323232",
                fontFamily: brandFont,
                fontSize: 23,
                fontWeight: 800,
                letterSpacing: -0.9,
                opacity: interpolate(frame, [134 + index * 2, 146 + index * 2], [0, 1], clamp),
                textTransform: "none",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <main
        style={{
          alignItems: "center",
          display: "grid",
          gap: 80,
          gridTemplateColumns: "minmax(0, 1fr) 300px",
          margin: "0 auto",
          maxWidth: 1180,
          opacity: heroOpacity,
          padding: "198px 68px 0",
          translate: `0px ${interpolate(frame, [116, 148], [38, 0], {
            easing: ease,
            ...clamp,
          })}px`,
          width: "100%",
        }}
      >
        <section>
          <p
            style={{
              color: red,
              fontFamily: brandFont,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 2.8,
              margin: "0 0 30px",
              textTransform: "uppercase",
            }}
          >
            {brandText} studio
          </p>
          <h1
            style={{
              fontFamily: brandFont,
              fontSize: 92,
              fontWeight: 500,
              letterSpacing: -3,
              lineHeight: 0.98,
              margin: 0,
              maxWidth: 800,
              textTransform: "uppercase",
            }}
          >
            Recreate the way teams hire.
          </h1>
        </section>

        <aside
          style={{
            alignItems: "center",
            borderLeft: "1px solid rgba(23, 23, 23, 0.16)",
            display: "flex",
            flexDirection: "column",
            gap: 34,
            justifyContent: "center",
            minHeight: 320,
          }}
        >
          <div
            style={{
              backgroundColor: red,
              borderRadius: 999,
              height: 42,
              opacity: frame % 28 < 15 ? 1 : 0.28,
              width: 42,
            }}
          />
          <div
            style={{
              fontFamily: brandFont,
              fontSize: 26,
              letterSpacing: 2.6,
              textAlign: "center",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
            }}
          >
            Studio
          </div>
          <p
            style={{
              color: "#55524d",
              fontFamily: brandFont,
              fontSize: 14,
              letterSpacing: 1.4,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Est. 2026
          </p>
        </aside>
      </main>
    </AbsoluteFill>
  );
};
