import { type CopyPlace } from './types'

type Props = {
  item: Element
  e: MouseEvent
  distanceToEdge: number
}

export const getPastePlace = ({
  item,
  e,
  distanceToEdge,
}: Props): CopyPlace => {
  const { height, top } = item.getBoundingClientRect()
  const yWithinElement = e.clientY - top
  const distToTop = yWithinElement
  const distToBottom = height - yWithinElement

  if (distToTop < distanceToEdge) return { pastePos: 'top', id: item.id }
  if (distToBottom < distanceToEdge) return { pastePos: 'bottom', id: item.id }
  return { pastePos: 'middle', id: item.id }
}
