import { cls } from '@shared/consts/cls'

export const showDraggableArea = (): void => {
  const droppableElements = document.querySelectorAll(`.${cls.droppable}`)

  droppableElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.outline = '2px dashed grey'
    }
  })

  const dropHereTextElements = document.querySelectorAll(`.${cls.dropHereText}`)

  dropHereTextElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.display = 'block'
    }
  })
}

export const hideDraggableArea = (): void => {
  const droppableElements = document.querySelectorAll(`.${cls.droppable}`)

  droppableElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.outline = ''
    }
  })

  const dropHereTextElements = document.querySelectorAll(`.${cls.dropHereText}`)

  dropHereTextElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.display = 'none'
    }
  })
}
