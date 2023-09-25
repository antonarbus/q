import type { CopyPlace } from 'client/shared/types'

type Props = {
  item: Element
  e: MouseEvent
  distanceToEdge: number
}

export const getPastePlace = ({ item, e, distanceToEdge }: Props): CopyPlace => {
  const { height, top } = item.getBoundingClientRect()
  const yWithinElement = e.clientY - top
  const distToTop = yWithinElement
  const distToBottom = height - yWithinElement

  if (distToTop < distanceToEdge) return { pastePos: 'top', itemId: item.id }
  if (distToBottom < distanceToEdge) return { pastePos: 'bottom', itemId: item.id }
  return { pastePos: 'middle', itemId: item.id }
}
