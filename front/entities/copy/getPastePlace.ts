import type { CopyPlace } from './types'

type Props = {
  hoveredElement: Element
  event: MouseEvent
  distanceToEdge: number
}

export const getPastePlace = ({
  hoveredElement,
  event,
  distanceToEdge,
}: Props): CopyPlace => {
  const elementRect = hoveredElement.getBoundingClientRect()
  const yWithinElement = event.clientY - elementRect.top
  const distToTop = yWithinElement
  const distToBottom = elementRect.height - yWithinElement

  if (distToTop < distanceToEdge) {
    return {
      pastePos: 'top',
      id: hoveredElement.id,
    }
  }

  if (distToBottom < distanceToEdge) {
    return {
      pastePos: 'bottom',
      id: hoveredElement.id,
    }
  }

  return {
    pastePos: 'middle',
    id: hoveredElement.id,
  }
}
