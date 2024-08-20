import { cls } from '@shared/consts/cls'
import type { MouseEvent } from 'react'

export const getPaperElementHtml = (e?: MouseEvent): string => {
  // eslint-disable-next-line no-undef-init
  let paperElementClone: Element | undefined = undefined

  if (e) {
    const clickedIconElement = e.target
    if (!(clickedIconElement instanceof Element)) return 'element not found'
    const blockElement = clickedIconElement.closest(`.${cls.block}`)
    if (!(blockElement instanceof Element)) return 'element not found'
    const paperElement = blockElement.querySelector(`.${cls.paper}`)
    if (!(paperElement instanceof Element)) return 'element not found'
    paperElementClone = paperElement.cloneNode(true) as Element
  } else {
    const paperElement = document.querySelector(`.${cls.paper}`)
    if (!(paperElement instanceof Element)) return 'element not found'
    paperElementClone = paperElement.cloneNode(true) as Element
  }

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
