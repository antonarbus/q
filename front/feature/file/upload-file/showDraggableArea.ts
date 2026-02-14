import { cls } from '@shared/cls'

export const showDraggableArea = (): void => {
  const dropHereTextElements = document.querySelectorAll(`.${cls.dropHereText}`)

  dropHereTextElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.display = 'grid'
    }
  })
}

export const hideDraggableArea = (): void => {
  const dropHereTextElements = document.querySelectorAll(`.${cls.dropHereText}`)

  dropHereTextElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.display = 'none'
    }
  })
}
