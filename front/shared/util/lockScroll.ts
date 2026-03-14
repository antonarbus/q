// Safari scrolls unexpectedly when TipTap editors unmount/remount (e.g. during
// deletion). The scroll doesn't always fire a 'scroll' event (browser-native
// focus-scroll bypasses it), so we restore position every rAF for 500ms instead.
export const lockScroll = (): void => {
  const x = window.scrollX
  const y = window.scrollY

  // performance.now() used instead of Date.now() for for timing animations alongside requestAnimationFrame
  const deadline = performance.now() + 500

  const restoreScroll = (): void => {
    window.scrollTo(x, y)

    if (performance.now() < deadline) {
      requestAnimationFrame(restoreScroll)
    }
  }

  requestAnimationFrame(restoreScroll)
}
