import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { getBoqColumnFromStore } from '@entity/quotation/redux/getter/getBoqColumnFromStore'
import { quotationSlice } from '@entity/quotation/redux/quotationSlice'
import { cls } from '@shared/cls'
import { dispatch } from '@shared/lib/redux'

type Props = {
  headerColumnElement: HTMLElement
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const onColumnResizeStart = (props: Props): void => {
  const width = props.headerColumnElement.clientWidth

  dispatch(
    quotationSlice.actions.disableFroalaReducer({
      blockIndex: props.blockIndex,
    }),
  )

  dispatch(
    quotationSlice.actions.updateColWidthReducer({
      blockIndex: props.blockIndex,
      width,
      boqColumnKey: props.boqColumnKey,
    }),
  )

  dispatch(
    quotationSlice.actions.hideBoqItemPinsReducer({
      blockIndex: props.blockIndex,
    }),
  )
}

export const onColumnResize = (props: Props): void => {
  const width = props.headerColumnElement.clientWidth

  const column = getBoqColumnFromStore({
    blockIndex: props.blockIndex,
    boqColumnKey: props.boqColumnKey,
  })

  if (column === undefined) {
    return
  }

  const didWidthChange = column.width !== width

  if (didWidthChange === false) {
    return
  }

  dispatch(
    quotationSlice.actions.updateColWidthReducer({
      blockIndex: props.blockIndex,
      width,
      boqColumnKey: props.boqColumnKey,
    }),
  )
}

export const onColumnResizeStop = (props: Props): void => {
  const columnWidth = props.headerColumnElement.clientWidth

  dispatch(
    quotationSlice.actions.updateColWidthReducer({
      blockIndex: props.blockIndex,
      width: columnWidth,
      boqColumnKey: props.boqColumnKey,
    }),
  )

  const itemWidth = props.headerColumnElement.closest(
    `.${cls.paper}`,
  )?.clientWidth

  dispatch(
    quotationSlice.actions.updateBlockWidthReducer({
      blockIndex: props.blockIndex,
      width: itemWidth ?? 0,
    }),
  )

  dispatch(
    quotationSlice.actions.enableFroalaReducer({
      blockIndex: props.blockIndex,
    }),
  )
}
