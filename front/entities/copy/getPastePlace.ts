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
  const { height, top } = hoveredElement.getBoundingClientRect()
  const yWithinElement = event.clientY - top
  const distToTop = yWithinElement
  const distToBottom = height - yWithinElement

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
