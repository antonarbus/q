import {
  fixImagesHeight,
  itemType,
  unfixImagesHeight,
} from '@entities/quotation'
import type {
  OnItemResize,
  OnItemResizeStart,
  OnItemResizeStop,
} from '@shared/types/resizablePaper'
import { bookmarkSignal } from '@entities/bookmark'

export const onTextBlockBookmarkResizeStart: OnItemResizeStart = ({
  blockIndex,
  e,
  dir,
  elementRef,
}) => {
  unfixImagesHeight()
}

export const onTextBlockBookmarkResize: OnItemResize = ({
  blockIndex,
  e,
  direction,
  elementRef,
  delta,
}) => {
  const width = parseInt(elementRef.style.width, 10)
  if (bookmarkSignal.value?.type !== itemType.text) return
  const newBookmarkValue = structuredClone(bookmarkSignal.value)
  newBookmarkValue.width = width
  bookmarkSignal.value = newBookmarkValue
}

export const onTextBlockBookmarkResizeStop: OnItemResizeStop = ({
  blockIndex,
  e,
  direction,
  elementRef,
  delta,
}) => {
  fixImagesHeight()
  const width = parseInt(elementRef.style.width, 10)
  if (bookmarkSignal.value?.type !== itemType.text) return
  const newBookmarkValue = structuredClone(bookmarkSignal.value)
  newBookmarkValue.width = width
  bookmarkSignal.value = newBookmarkValue
}
