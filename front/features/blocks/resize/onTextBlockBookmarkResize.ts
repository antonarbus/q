import {
  fixImagesHeight,
  itemType,
  unfixImagesHeight,
} from '@entities/quotation'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/types/resizablePaper'
import { bookmarkSignal } from '@entities/bookmark'

export const onTextBlockBookmarkResizeStart: OnBlockResizeStart = ({
  blockIndex,
  e,
  dir,
  elementRef,
}) => {
  unfixImagesHeight()
}

export const onTextBlockBookmarkResize: OnBlockResize = ({
  blockIndex,
  e,
  direction,
  elementRef,
  delta,
}) => {
  const width = parseInt(elementRef.style.width)
  if (bookmarkSignal.value?.type !== itemType.text) return
  const newBookmarkValue = structuredClone(bookmarkSignal.value)
  newBookmarkValue.width = width
  bookmarkSignal.value = newBookmarkValue
}

export const onTextBlockBookmarkResizeStop: OnBlockResizeStop = ({
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
