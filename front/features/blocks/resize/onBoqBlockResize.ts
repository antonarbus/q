import {
  boqColumnKey,
  columnMinWidth,
  getBoqColumnFromStore,
  itemType,
  quotationSlice,
} from '@entities/quotation'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/lib/re-resizable/resizablePaper'
import { dispatch, getState } from '@shared/lib/redux'

// can be global var for different boqItems as we can change width of one item at a time
let initNumberColumnWidth = 0
let initDescriptionColumnWidth = 0
let initItemPriceColumnWidth = 0
let initQtyColumnWidth = 0
let initPriceColumnWidth = 0

let numberColumnDeltaWidth = 0
let descriptionColumnDeltaWidth = 0
let itemPriceColumnDeltaWidth = 0
let qtyColumnDeltaWidth = 0
let priceColumnDeltaWidth = 0

export const onBoqBlockResizeStart: OnBlockResizeStart = ({
  blockIndex,
  event,
  dir,
  elementRef: itemElement,
}) => {
  dispatch(quotationSlice.actions.disableFroalaReducer({ blockIndex }))
  dispatch(quotationSlice.actions.hideBoqItemPinsReducer({ blockIndex }))

  const block = getState().quotation.blocks[blockIndex]

  if (block?.type !== itemType.boq) {
    return
  }

  initNumberColumnWidth = block.boq.column.number.width
  initDescriptionColumnWidth = block.boq.column.description.width
  initItemPriceColumnWidth = block.boq.column.itemPrice.width
  initQtyColumnWidth = block.boq.column.qty.width
  initPriceColumnWidth = block.boq.column.price.width

  numberColumnDeltaWidth = 0
  descriptionColumnDeltaWidth = 0
  itemPriceColumnDeltaWidth = 0
  qtyColumnDeltaWidth = 0
  priceColumnDeltaWidth = 0
}

/**
 * On block width shrink at first shrink 'description' column
 * then 'qty', then 'itemPrice', then 'qty', then 'price'
 * On block width expand make 'description' column wider
 */
export const onBoqBlockResize: OnBlockResize = ({
  blockIndex,
  event,
  direction,
  elementRef,
  delta,
}) => {
  const isShrinking = delta.width < 0

  // description column

  const descriptionColumn = getBoqColumnFromStore({
    blockIndex,
    boqColumnKey: boqColumnKey.description,
  })

  if (descriptionColumn === undefined) {
    return
  }

  if (isShrinking === true) {
    if (descriptionColumn.width > columnMinWidth.description) {
      descriptionColumnDeltaWidth = delta.width

      const descriptionColumnWidth =
        initDescriptionColumnWidth + descriptionColumnDeltaWidth

      dispatch(
        quotationSlice.actions.updateColWidthReducer({
          blockIndex,
          boqColumnKey: boqColumnKey.description,
          width: descriptionColumnWidth,
        }),
      )

      return
    }

    // number column

    const numberColumn = getBoqColumnFromStore({
      blockIndex,
      boqColumnKey: boqColumnKey.number,
    })

    if (numberColumn === undefined) {
      return
    }

    if (numberColumn.width > columnMinWidth.number) {
      numberColumnDeltaWidth = delta.width - descriptionColumnDeltaWidth

      const numberColumnWidth = initNumberColumnWidth + numberColumnDeltaWidth

      dispatch(
        quotationSlice.actions.updateColWidthReducer({
          blockIndex,
          boqColumnKey: boqColumnKey.number,
          width: numberColumnWidth,
        }),
      )

      return
    }

    // itemPrice column

    const itemPriceColumn = getBoqColumnFromStore({
      blockIndex,
      boqColumnKey: boqColumnKey.itemPrice,
    })

    if (itemPriceColumn === undefined) {
      return
    }

    if (itemPriceColumn.width > columnMinWidth.itemPrice) {
      itemPriceColumnDeltaWidth =
        delta.width - numberColumnDeltaWidth - descriptionColumnDeltaWidth

      const itemPriceColumnWidth =
        initItemPriceColumnWidth + itemPriceColumnDeltaWidth

      dispatch(
        quotationSlice.actions.updateColWidthReducer({
          blockIndex,
          boqColumnKey: boqColumnKey.itemPrice,
          width: itemPriceColumnWidth,
        }),
      )

      return
    }

    // qty column

    const qtyColumn = getBoqColumnFromStore({
      blockIndex,
      boqColumnKey: boqColumnKey.qty,
    })

    if (qtyColumn === undefined) {
      return
    }

    if (qtyColumn.width > columnMinWidth.qty) {
      qtyColumnDeltaWidth =
        delta.width -
        numberColumnDeltaWidth -
        descriptionColumnDeltaWidth -
        itemPriceColumnDeltaWidth

      const qtyColumnWidth = initQtyColumnWidth + qtyColumnDeltaWidth

      dispatch(
        quotationSlice.actions.updateColWidthReducer({
          blockIndex,
          boqColumnKey: boqColumnKey.qty,
          width: qtyColumnWidth,
        }),
      )

      return
    }

    // price column

    const priceColumn = getBoqColumnFromStore({
      blockIndex,
      boqColumnKey: boqColumnKey.price,
    })

    if (priceColumn === undefined) {
      return
    }

    if (priceColumn.width > columnMinWidth.price) {
      priceColumnDeltaWidth =
        delta.width -
        numberColumnDeltaWidth -
        descriptionColumnDeltaWidth -
        itemPriceColumnDeltaWidth -
        qtyColumnDeltaWidth

      const priceColumnWidth = initPriceColumnWidth + priceColumnDeltaWidth

      dispatch(
        quotationSlice.actions.updateColWidthReducer({
          blockIndex,
          boqColumnKey: boqColumnKey.price,
          width: priceColumnWidth,
        }),
      )
    }

    return
  }

  const isExpanding = delta.width > 0

  if (isExpanding === true) {
    descriptionColumnDeltaWidth = delta.width

    const descriptionColumnWidth =
      initDescriptionColumnWidth + descriptionColumnDeltaWidth

    dispatch(
      quotationSlice.actions.updateColWidthReducer({
        blockIndex,
        boqColumnKey: boqColumnKey.description,
        width: descriptionColumnWidth,
      }),
    )
  }
}

export const onBoqBlockResizeStop: OnBlockResizeStop = ({
  blockIndex,
  event,
  direction,
  elementRef: itemElement,
  delta,
}) => {
  const descriptionHeaderElement = itemElement.querySelector('.th.description')

  if (descriptionHeaderElement instanceof HTMLElement === false) {
    return
  }

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
