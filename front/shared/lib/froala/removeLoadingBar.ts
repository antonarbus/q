export const removeLoadingBar = (): void => {
  const progressBarElement = document.querySelector(
    '.fr-popup.fr-desktop.fr-inline.fr-active',
  )

  if (progressBarElement instanceof HTMLElement === false) {
    return
  }

  progressBarElement.classList.remove('fr-active')
}
