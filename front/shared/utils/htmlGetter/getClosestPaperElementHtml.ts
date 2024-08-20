import { cls } from '@shared/consts/cls'
import type { MouseEvent } from 'react'

export const getClosestPaperElementHtml = (e: MouseEvent): string => {
  const clickedIconElement = e.target
  if (!(clickedIconElement instanceof Element)) return 'element not found'
  const blockElement = clickedIconElement.closest(`.${cls.block}`)
  if (!(blockElement instanceof Element)) return 'element not found'
  const paperElement = blockElement.querySelector(`.${cls.paper}`)
  if (!(paperElement instanceof Element)) return 'element not found'
  const paperElementClone = paperElement.cloneNode(true)
  if (!(paperElementClone instanceof Element)) return 'element not found'

  // todo: add to cls object
  const elementsToRemove = paperElementClone.querySelectorAll(
    '.static-html,.fr-placeholder,.right-resize-handle,.left-resize-handle,.actions-container,#DndDescribedBy-1,#DndLiveRegion-0',
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
