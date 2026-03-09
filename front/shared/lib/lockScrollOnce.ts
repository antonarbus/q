// Safari scrolls unexpectedly when TipTap editors unmount/remount (e.g. during
// drag or resize). Intercept the next scroll event and immediately restore the
// current position, so the jump is never visible to the user.
export const lockScrollOnce = (): void => {
  const x = window.scrollX
  const y = window.scrollY

  const restoreScroll = (): void => {
    window.scrollTo(x, y)
  }

  window.addEventListener('scroll', restoreScroll, { once: true })

  // Safety cleanup — don't block intentional scrolls after 500ms
  setTimeout(() => {
    window.removeEventListener('scroll', restoreScroll)
  }, 500)
}
