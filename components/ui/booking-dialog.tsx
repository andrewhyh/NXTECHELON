"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  "https://cal.com/nxtechelon-placeholder/30min";

/**
 * BookingDialog — native <dialog>, escape-able, scrim-dismissable, iframe-loaded.
 * Any element with `data-booking-trigger` anywhere on the page opens it.
 * Replace the URL via NEXT_PUBLIC_BOOKING_URL once the real Cal.com handle lands.
 */
export function BookingDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const trigger = target.closest("[data-booking-trigger]");
      if (!trigger) return;
      event.preventDefault();
      const dialog = dialogRef.current;
      if (!dialog) return;
      if (iframeRef.current && !iframeRef.current.src) {
        iframeRef.current.src = BOOKING_URL;
      }
      dialog.showModal();
    };

    const handleBackdrop = (event: MouseEvent) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const rect = dialog.getBoundingClientRect();
      const clickedOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (clickedOutside) dialog.close();
    };

    document.addEventListener("click", handleClick);
    const dialog = dialogRef.current;
    dialog?.addEventListener("click", handleBackdrop);

    return () => {
      document.removeEventListener("click", handleClick);
      dialog?.removeEventListener("click", handleBackdrop);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="m-0 w-full max-w-3xl rounded-md border border-border bg-secondary p-0 text-foreground backdrop:bg-ink/80 open:fixed open:inset-0 open:m-auto"
      aria-labelledby="booking-title"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/80 transition-colors hover:bg-secondary/60 hover:text-foreground"
          aria-label="Close booking dialog"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>

        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-signal">
          Book a call
        </p>
        <h2
          id="booking-title"
          className="mt-3 max-w-[20ch] font-serif text-3xl font-light leading-[1.05] text-foreground sm:text-4xl"
        >
          Thirty minutes. We figure out what to build &mdash; and whether
          it&rsquo;s worth your money.
        </h2>
        <p className="mt-3 max-w-[55ch] text-sm text-muted-foreground sm:text-base">
          Placeholder Cal.com handle is wired below. Replace via{" "}
          <code className="font-mono text-foreground/80">NEXT_PUBLIC_BOOKING_URL</code>{" "}
          before launch.
        </p>

        <iframe
          ref={iframeRef}
          title="Book a 30-minute call with NXTECHELON"
          loading="lazy"
          className="mt-6 h-[62vh] max-h-[640px] w-full rounded-md border border-border bg-paper"
        />
      </div>
    </dialog>
  );
}
