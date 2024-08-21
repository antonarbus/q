import { cls } from '@shared/consts/cls'
import type { MouseEvent } from 'react'

export const getClosestRowHtml = (e: MouseEvent): string => {
  const clickedIconElement = e.target
  if (!(clickedIconElement instanceof Element)) return 'element not found'

  const rowElement = clickedIconElement.closest(`.${cls.boqRow}`)
  if (!rowElement) return 'element not found'

  const rowElementClone = rowElement.cloneNode(true)
  if (!(rowElementClone instanceof Element)) return 'element not found'

  const elementsToRemove = rowElementClone.querySelectorAll(cls.cleanFromPaper)

  elementsToRemove.forEach((element) => {
    element.parentNode?.removeChild(element)
  })

  const html = rowElementClone.outerHTML

  const htmlWithoutContentEditableTag = html.replaceAll(
    'contenteditable="true"',
    '',
  )

  return htmlWithoutContentEditableTag
}
