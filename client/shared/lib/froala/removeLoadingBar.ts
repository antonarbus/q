export const removeLoadingBar = (): void => {
  const progressBarElement = document.querySelector('.fr-popup.fr-desktop.fr-inline.fr-active')
  if (!(progressBarElement instanceof HTMLElement)) return
  progressBarElement.classList.remove('fr-active')
}
