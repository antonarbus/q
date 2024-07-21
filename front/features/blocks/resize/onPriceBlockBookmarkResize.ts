import { itemType } from '@entities/quotation'
import type { OnBlockResizeStop } from '@shared/types/resizablePaper'
import { bookmarkSignal } from '@entities/bookmark'

export const onPriceBlockBookmarkResizeStop: OnBlockResizeStop = ({
  blockIndex,
  e,
  direction,
  elementRef,
  delta,
}) => {
  const width = parseInt(elementRef.style.width)
  if (bookmarkSignal.value?.type !== itemType.price) return
  const newBookmarkValue = structuredClone(bookmarkSignal.value)
  newBookmarkValue.width = width
  bookmarkSignal.value = newBookmarkValue
}
