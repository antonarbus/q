import { dispatch } from '@lib_instances/store'
import { cls } from '@shared/consts/cls'
import { quotationSlice, getBoqColumnFromStore } from '@entities/quotation'
import type { BoqColumnKey } from '@entities/quotation/consts/boqColumnKey'

type Props = {
  headerColumnElement: HTMLElement
  blockIndex: number
  boqColumnKey: BoqColumnKey
}

export const onColumnResizeStart = ({
  headerColumnElement,
  blockIndex,
  boqColumnKey,
}: Props): void => {
  const width = headerColumnElement.clientWidth

  dispatch(quotationSlice.actions.disableFroalaReducer({ blockIndex }))

  dispatch(
    quotationSlice.actions.updateColWidthReducer({
      blockIndex,
      width,
      boqColumnKey,
    }),
  )

  dispatch(quotationSlice.actions.hideBoqItemPinsReducer({ blockIndex }))
}

export const onColumnResize = ({
  headerColumnElement,
  blockIndex,
  boqColumnKey,
}: Props): void => {
  const width = headerColumnElement.clientWidth
  const column = getBoqColumnFromStore({ blockIndex, boqColumnKey })

  if (column === undefined) return

  const didWidthChange = column.width !== width

  if (!didWidthChange) return

  dispatch(
    quotationSlice.actions.updateColWidthReducer({
      blockIndex,
      width,
      boqColumnKey,
    }),
  )
}

export const onColumnResizeStop = ({
  headerColumnElement,
  blockIndex,
  boqColumnKey,
}: Props): void => {
  const columnWidth = headerColumnElement.clientWidth

  dispatch(
    quotationSlice.actions.updateColWidthReducer({
      blockIndex,
      width: columnWidth,
      boqColumnKey,
    }),
  )

  const itemWidth = headerColumnElement.closest(`.${cls.paper}`)?.clientWidth

  dispatch(
    quotationSlice.actions.updateBlockWidthReducer({
      blockIndex,
      width: itemWidth ?? 0,
    }),
  )

  dispatch(quotationSlice.actions.enableFroalaReducer({ blockIndex }))
}
