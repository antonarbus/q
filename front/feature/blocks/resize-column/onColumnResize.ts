import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { getBoqColumnFromStoreByIndex } from '@entity/quotation/redux/getter/getBoqColumnFromStoreByIndex'
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
    quotationSlice.actions.updateColWidth({
      blockIndex: props.blockIndex,
      width,
      boqColumnKey: props.boqColumnKey,
    }),
  )

  dispatch(
    quotationSlice.actions.hideBoqItemPins({
      blockIndex: props.blockIndex,
    }),
  )
}

export const onColumnResize = (props: Props): void => {
  const width = props.headerColumnElement.clientWidth

  const column = getBoqColumnFromStoreByIndex({
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
    quotationSlice.actions.updateColWidth({
      blockIndex: props.blockIndex,
      width,
      boqColumnKey: props.boqColumnKey,
    }),
  )
}

export const onColumnResizeStop = (props: Props): void => {
  const columnWidth = props.headerColumnElement.clientWidth

  dispatch(
    quotationSlice.actions.updateColWidth({
      blockIndex: props.blockIndex,
      width: columnWidth,
      boqColumnKey: props.boqColumnKey,
    }),
  )

  const itemWidth = props.headerColumnElement.closest(
    `.${cls.paper}`,
  )?.clientWidth

  dispatch(
    quotationSlice.actions.updateBlockWidth({
      blockIndex: props.blockIndex,
      width: itemWidth ?? 0,
    }),
  )
}
