// Safari scrolls unexpectedly when TipTap editors unmount/remount (e.g. during
// drag or resize). Intercept the next scroll events and restore the
// position for any scrolls during 500ms, so the jump is never visible to the user.
export const lockScroll = (): void => {
  const x = window.scrollX
  const y = window.scrollY

  const restoreScroll = (): void => {
    window.scrollTo(x, y)
  }

  window.addEventListener('scroll', restoreScroll)

  // Safety cleanup — don't block intentional scrolls after 500ms
  setTimeout(() => {
    window.removeEventListener('scroll', restoreScroll)
  }, 500)
}
