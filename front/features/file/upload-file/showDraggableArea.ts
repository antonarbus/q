import { cls } from '@shared/const/cls'

const DROP_ELEMENT_SELECTOR = `.${cls.droppable} .editable-html .fr-wrapper`
const DROP_HERE_TEXT_SELECTOR = `.${cls.dropHereText}`

export const showDraggableArea = (): void => {
  const droppableElements = document.querySelectorAll(DROP_ELEMENT_SELECTOR)

  droppableElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.outline = '2px dashed grey'
    }
  })

  const dropHereTextElements = document.querySelectorAll(
    DROP_HERE_TEXT_SELECTOR,
  )

  dropHereTextElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.display = 'block'
    }
  })
}

export const hideDraggableArea = (): void => {
  const droppableElements = document.querySelectorAll(DROP_ELEMENT_SELECTOR)

  droppableElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.outline = ''
    }
  })

  const dropHereTextElements = document.querySelectorAll(
    DROP_HERE_TEXT_SELECTOR,
  )

  dropHereTextElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.display = 'none'
    }
  })
}
