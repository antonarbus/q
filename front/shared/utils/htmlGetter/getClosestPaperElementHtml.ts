import { cls } from '@shared/consts/cls'
import type { MouseEvent } from 'react'

export const getClosestPaperElementHtml = (e: MouseEvent): string => {
  const clickedIconElement = e.target

  if (clickedIconElement instanceof Element === false) {
    return 'element not found'
  }

  const blockElement = clickedIconElement.closest(`.${cls.block}`)

  if (blockElement instanceof Element === false) {
    return 'element not found'
  }

  const paperElement = blockElement.querySelector(`.${cls.paper}`)

  if (paperElement instanceof Element === false) {
    return 'element not found'
  }

  const paperElementClone = paperElement.cloneNode(true)

  if (paperElementClone instanceof Element === false) {
    return 'element not found'
  }

  const elementsToRemove = paperElementClone.querySelectorAll(
    cls.cleanFromPaper,
  )

  elementsToRemove.forEach((element) => {
    element.parentNode?.removeChild(element)
  })

  const html = paperElementClone.innerHTML

  const htmlWithoutContentEditableTag = html.replaceAll(
    'contenteditable="true"',
    '',
  )

  return htmlWithoutContentEditableTag
}
