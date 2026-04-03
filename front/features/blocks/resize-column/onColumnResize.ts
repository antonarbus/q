import type { BoqColumnKey } from '@back/entity/quotation/schema'
import { getBoqColumnFromStoreByIndex } from '@front/entities/quotation/redux/getter/getBoqColumnFromStoreByIndex'
import { quotationSlice } from '@front/entities/quotation/redux/quotationSlice'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'

type Props = {
  headerColumnElement: HTMLElement
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const onColumnResizeStart = (props: Props): void => {
  const width = props.headerColumnElement.clientWidth

  reduxHolder.dispatch(
    quotationSlice.actions.updateColWidth({
      blockIndex: props.blockIndex,
      width,
      boqColumnKey: props.boqColumnKey,
    }),
  )

  reduxHolder.dispatch(
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

  reduxHolder.dispatch(
    quotationSlice.actions.updateColWidth({
      blockIndex: props.blockIndex,
      width,
      boqColumnKey: props.boqColumnKey,
    }),
  )
}

export const onColumnResizeStop = (props: Props): void => {
  const columnWidth = props.headerColumnElement.clientWidth

  reduxHolder.dispatch(
    quotationSlice.actions.updateColWidth({
      blockIndex: props.blockIndex,
      width: columnWidth,
      boqColumnKey: props.boqColumnKey,
    }),
  )

  const itemWidth = props.headerColumnElement.closest(`.${cls.paper}`)?.clientWidth

  reduxHolder.dispatch(
    quotationSlice.actions.updateBlockWidth({
      blockIndex: props.blockIndex,
      width: itemWidth ?? 0,
    }),
  )
}
