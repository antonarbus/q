import { browserType } from './browserType'
// Safari scrolls unexpectedly when TipTap editors unmount/remount (e.g. during
// deletion). The scroll doesn't always fire a 'scroll' event (browser-native
// focus-scroll bypasses it), so we restore position every rAF for the given

// todo: maybe if we remove the need for isEditable, then scroll prblem will be resolved automatically

// duration instead. Pass blockScrollLockDurationMs from theme.ts.
export const lockScroll = (): void => {
  const x = window.scrollX
  const y = window.scrollY

  // animationDuration 300ms + 600ms/200ms for safari/chrome scroll-correction to settle after focus-scroll
  const durationMs = browserType === 'safari' ? 900 : 500

  // performance.now() used instead of Date.now() for timing animations alongside requestAnimationFrame
  const deadline = performance.now() + durationMs

  const restoreScroll = (): void => {
    window.scrollTo(x, y)

    if (performance.now() < deadline) {
      requestAnimationFrame(restoreScroll)
    }
  }

  requestAnimationFrame(restoreScroll)
}
