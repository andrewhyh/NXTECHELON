"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";

export function MotionController() {
  const activeDialogTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const body = document.body;
    body.classList.add("scroll-locked");
    const unlockTimer = window.setTimeout(() => body.classList.remove("scroll-locked"), reduced ? 0 : 600);

    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | undefined;
    let rafId = 0;

    if (!reduced) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
    }

    const splits: SplitType[] = [];
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    revealTargets.forEach((target) => {
      const split = new SplitType(target, { types: "words", tagName: "span" });
      splits.push(split);
      gsap.fromTo(split.words, {
        yPercent: reduced ? 0 : 18,
      }, {
        yPercent: 0,
        duration: reduced ? 0 : 0.9,
        ease: "expo.out",
        stagger: reduced ? 0 : 0.045,
        scrollTrigger: target.closest("[data-section]")
          ? {
              trigger: target.closest("[data-section]"),
              start: "top 72%",
              once: true,
            }
          : undefined,
      });
    });

    if (!reduced) {
      gsap.to("[data-hero-signature]", {
        yPercent: 8,
        opacity: 0.72,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    const preconnect = () => {
      if (document.querySelector('link[data-cal-preconnect="true"]')) return;
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = "https://cal.com";
      link.dataset.calPreconnect = "true";
      document.head.appendChild(link);
    };

    ScrollTrigger.create({
      trigger: "[data-hero]",
      start: "bottom 85%",
      once: true,
      onEnter: preconnect,
    });

    const dialog = document.querySelector<HTMLDialogElement>("[data-booking-dialog]");
    const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-cal-trigger]"));
    const closeButton = dialog?.querySelector<HTMLButtonElement>("[data-dialog-close]");

    const closeDialog = () => {
      if (!dialog?.open) return;
      dialog.close();
      activeDialogTrigger.current?.focus();
    };

    const restoreFocus = () => {
      activeDialogTrigger.current?.focus();
    };

    const onTriggerClick = (event: MouseEvent) => {
      if (!dialog) return;
      event.preventDefault();
      activeDialogTrigger.current = event.currentTarget as HTMLElement;
      dialog.showModal();
      const closeButton = dialog.querySelector<HTMLButtonElement>("[data-dialog-close]");
      closeButton?.focus();
    };

    const onDialogClick = (event: MouseEvent) => {
      if (!dialog || event.target !== dialog) return;
      closeDialog();
    };

    triggers.forEach((trigger) => trigger.addEventListener("click", onTriggerClick));
    closeButton?.addEventListener("click", closeDialog);
    dialog?.addEventListener("click", onDialogClick);
    dialog?.addEventListener("close", restoreFocus);

    return () => {
      window.clearTimeout(unlockTimer);
      body.classList.remove("scroll-locked");
      triggers.forEach((trigger) => trigger.removeEventListener("click", onTriggerClick));
      closeButton?.removeEventListener("click", closeDialog);
      dialog?.removeEventListener("click", onDialogClick);
      dialog?.removeEventListener("close", restoreFocus);
      splits.forEach((split) => split.revert());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
