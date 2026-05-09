import type { CopyPlace } from '@front/entities/quotation/redux/clipboardSlice'

type Props = {
  hoveredElement: Element
  event: MouseEvent
  distanceToEdge: number
}

export const getPastePlace = (props: Props): CopyPlace => {
  const elementRect = props.hoveredElement.getBoundingClientRect()
  const yWithinElement = props.event.clientY - elementRect.top
  const distToTop = yWithinElement
  const distToBottom = elementRect.height - yWithinElement

  if (distToTop < props.distanceToEdge) {
    return {
      pastePos: 'top',
      id: props.hoveredElement.id,
    }
  }

  if (distToBottom < props.distanceToEdge) {
    return {
      pastePos: 'bottom',
      id: props.hoveredElement.id,
    }
  }

  return {
    pastePos: 'middle',
    id: props.hoveredElement.id,
  }
}
