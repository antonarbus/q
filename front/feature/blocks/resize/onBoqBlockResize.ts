import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { getBoqColumnFromStore } from '@entity/quotation/redux/getter/getBoqColumnFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { textSlice } from '@shared/lib/tiptap/store/textSlice'
import type {
  OnBlockResize,
  OnBlockResizeStart,
  OnBlockResizeStop,
} from '@shared/lib/re-resizable/resizablePaper'
import { dispatch, getState } from '@shared/lib/redux'
import { lockScrollOnce } from '@shared/lib/lockScrollOnce'

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

export const onBoqBlockResizeStart: OnBlockResizeStart = (props) => {
  lockScrollOnce()

  dispatch(textSlice.actions.setNotEditable())

  dispatch(
    quotationSlice.actions.hideBoqItemPins({
      blockIndex: props.blockIndex,
    }),
  )

  const block = getState().quotation.blocks[props.blockIndex]

  if (block?.type !== 'boq') {
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
export const onBoqBlockResize: OnBlockResize = (props) => {
  const isShrinking = props.delta.width < 0

  // description column

  const descriptionColumn = getBoqColumnFromStore({
    blockIndex: props.blockIndex,
    boqColumnKey: 'description',
  })

  if (descriptionColumn === undefined) {
    return
  }

  if (isShrinking === true) {
    if (descriptionColumn.width > columnMinWidth.description) {
      descriptionColumnDeltaWidth = props.delta.width

      const descriptionColumnWidth =
        initDescriptionColumnWidth + descriptionColumnDeltaWidth

      dispatch(
        quotationSlice.actions.updateColWidth({
          blockIndex: props.blockIndex,
          boqColumnKey: 'description',
          width: descriptionColumnWidth,
        }),
      )

      return
    }

    // number column

    const numberColumn = getBoqColumnFromStore({
      blockIndex: props.blockIndex,
      boqColumnKey: 'number',
    })

    if (numberColumn === undefined) {
      return
    }

    if (numberColumn.width > columnMinWidth.number) {
      numberColumnDeltaWidth = props.delta.width - descriptionColumnDeltaWidth

      const numberColumnWidth = initNumberColumnWidth + numberColumnDeltaWidth

      dispatch(
        quotationSlice.actions.updateColWidth({
          blockIndex: props.blockIndex,
          boqColumnKey: 'number',
          width: numberColumnWidth,
        }),
      )

      return
    }

    // itemPrice column

    const itemPriceColumn = getBoqColumnFromStore({
      blockIndex: props.blockIndex,
      boqColumnKey: 'itemPrice',
    })

    if (itemPriceColumn === undefined) {
      return
    }

    if (itemPriceColumn.width > columnMinWidth.itemPrice) {
      itemPriceColumnDeltaWidth =
        props.delta.width - numberColumnDeltaWidth - descriptionColumnDeltaWidth

      const itemPriceColumnWidth =
        initItemPriceColumnWidth + itemPriceColumnDeltaWidth

      dispatch(
        quotationSlice.actions.updateColWidth({
          blockIndex: props.blockIndex,
          boqColumnKey: 'itemPrice',
          width: itemPriceColumnWidth,
        }),
      )

      return
    }

    // qty column

    const qtyColumn = getBoqColumnFromStore({
      blockIndex: props.blockIndex,
      boqColumnKey: 'qty',
    })

    if (qtyColumn === undefined) {
      return
    }

    if (qtyColumn.width > columnMinWidth.qty) {
      qtyColumnDeltaWidth =
        props.delta.width -
        numberColumnDeltaWidth -
        descriptionColumnDeltaWidth -
        itemPriceColumnDeltaWidth

      const qtyColumnWidth = initQtyColumnWidth + qtyColumnDeltaWidth

      dispatch(
        quotationSlice.actions.updateColWidth({
          blockIndex: props.blockIndex,
          boqColumnKey: 'qty',
          width: qtyColumnWidth,
        }),
      )

      return
    }

    // price column

    const priceColumn = getBoqColumnFromStore({
      blockIndex: props.blockIndex,
      boqColumnKey: 'price',
    })

    if (priceColumn === undefined) {
      return
    }

    if (priceColumn.width > columnMinWidth.price) {
      priceColumnDeltaWidth =
        props.delta.width -
        numberColumnDeltaWidth -
        descriptionColumnDeltaWidth -
        itemPriceColumnDeltaWidth -
        qtyColumnDeltaWidth

      const priceColumnWidth = initPriceColumnWidth + priceColumnDeltaWidth

      dispatch(
        quotationSlice.actions.updateColWidth({
          blockIndex: props.blockIndex,
          boqColumnKey: 'price',
          width: priceColumnWidth,
        }),
      )
    }

    return
  }

  const isExpanding = props.delta.width > 0

  if (isExpanding === true) {
    descriptionColumnDeltaWidth = props.delta.width

    const descriptionColumnWidth =
      initDescriptionColumnWidth + descriptionColumnDeltaWidth

    dispatch(
      quotationSlice.actions.updateColWidth({
        blockIndex: props.blockIndex,
        boqColumnKey: 'description',
        width: descriptionColumnWidth,
      }),
    )
  }
}

export const onBoqBlockResizeStop: OnBlockResizeStop = (props) => {
  const descriptionHeaderElement =
    props.elementRef.querySelector('.th.description')

  if (descriptionHeaderElement instanceof HTMLElement === false) {
    return
  }

  lockScrollOnce()

  const width = descriptionHeaderElement.clientWidth

  dispatch(
    quotationSlice.actions.updateColWidth({
      blockIndex: props.blockIndex,
      boqColumnKey: 'description',
      width,
    }),
  )

  dispatch(textSlice.actions.setEditable())

  const itemWidth = props.elementRef.clientWidth
  const prevItemWidth = getState().quotation.blocks[props.blockIndex]?.width

  if (itemWidth !== prevItemWidth) {
    dispatch(
      quotationSlice.actions.updateBlockWidth({
        blockIndex: props.blockIndex,
        width: itemWidth,
      }),
    )
  }
}
