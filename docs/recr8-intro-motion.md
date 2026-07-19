# Recr8 Intro Motion Prototype

This Remotion prototype explores the Recr8 landing intro: a blinking recording-dot `REC` state transitions into the `REC.R8` logo, then docks into a flat grey navigation bar inspired by the TinyWins reference.

## Motion Beats

1. Dark navy intro field.
2. Red recording dot blinks beside `REC`.
3. The mark flickers and resolves into `REC.R8`.
4. The logo docks into a flat navigation bar.
5. The landing page content fades in after the nav settles.

## Web Handoff Notes

- Use Century Gothic or Aileron when licensed/available, with the current geometric fallback stack as backup.
- The production web version should measure the intro logo and final nav slot from real layout bounds so the dock movement remains responsive.
- Add a reduced-motion path that skips the intro and renders the nav in its settled state.
