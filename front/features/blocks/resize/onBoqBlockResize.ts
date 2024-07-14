import { dispatch, getState } from '@lib_instances/store'
import {
  type BoqBlock,
  quotationSlice,
  getBoqColumnFromStore,
  boqColumnKey,
  unfixImagesHeight,
  fixImagesHeight,
} from '@entities/quotation'
import type {
  OnItemResize,
  OnItemResizeStart,
  OnItemResizeStop,
} from '@shared/types/resizablePaper'

let initDescriptionColumnWidth = 0 // can be global var for different boqItems as we can change width of one item at a time

export const onBoqBlockResizeStart: OnItemResizeStart = ({
  blockIndex,
  e,
  dir,
  elementRef: itemElement,
}) => {
  unfixImagesHeight()
  dispatch(quotationSlice.actions.disableFroalaReducer({ blockIndex }))
  dispatch(quotationSlice.actions.hideBoqItemPinsReducer({ blockIndex }))

  initDescriptionColumnWidth =
    (getState().quotation.blocks[blockIndex] as BoqBlock).boq.column.description
      .width ?? 0
}

export const onBoqBlockResize: OnItemResize = ({
  blockIndex,
  e,
  direction,
  elementRef: itemElement,
  delta,
}) => {
  const width = initDescriptionColumnWidth + delta.width

  const descriptionColumn = getBoqColumnFromStore({
    blockIndex,
    boqColumnKey: boqColumnKey.description,
  })
  if (descriptionColumn === undefined) return
  const didWidthChange = descriptionColumn.width !== width
  if (!didWidthChange) return

  dispatch(
    quotationSlice.actions.updateColWidthReducer({
      blockIndex,
      boqColumnKey: boqColumnKey.description,
      width,
    }),
  )
}

export const onBoqBlockResizeStop: OnItemResizeStop = ({
  blockIndex,
  e,
  direction,
  elementRef: itemElement,
  delta,
}) => {
  fixImagesHeight()
  const descriptionHeaderElement = itemElement.querySelector('.th.description')
  if (!(descriptionHeaderElement instanceof HTMLElement)) return

  const width = descriptionHeaderElement.clientWidth
  dispatch(
    quotationSlice.actions.updateColWidthReducer({
      blockIndex,
      boqColumnKey: boqColumnKey.description,
      width,
    }),
  )
  dispatch(quotationSlice.actions.enableFroalaReducer({ blockIndex }))

  const itemWidth = itemElement.clientWidth
  const prevItemWidth = getState().quotation.blocks[blockIndex]?.width

  if (itemWidth !== prevItemWidth) {
    dispatch(
      quotationSlice.actions.updateBlockWidthReducer({
        blockIndex,
        width: itemWidth,
      }),
    )
  }
}
