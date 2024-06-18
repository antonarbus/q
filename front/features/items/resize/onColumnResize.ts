import { dispatch } from '@lib_instances/store'
import {
  type BoqColumnKey,
  quotationSlice,
  getBoqColumnFromStore,
  unfixItemImagesHeight,
  fixItemImagesHeight,
} from '@entities/quotation'
import { cls } from '@shared/consts/cls'

type Props = {
  headerColumnElement: HTMLElement
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const onColumnResizeStart = ({
  headerColumnElement,
  itemIndex,
  boqColumnKey,
}: Props): void => {
  unfixItemImagesHeight()
  const width = headerColumnElement.clientWidth
  dispatch(quotationSlice.actions.disableFroalaReducer({ itemIndex }))
  dispatch(
    quotationSlice.actions.updateColWidthReducer({
      itemIndex,
      width,
      boqColumnKey,
    }),
  )
  dispatch(quotationSlice.actions.hideBoqItemPinsReducer({ itemIndex }))
}

export const onColumnResize = ({
  headerColumnElement,
  itemIndex,
  boqColumnKey,
}: Props): void => {
  const width = headerColumnElement.clientWidth
  const column = getBoqColumnFromStore({ itemIndex, boqColumnKey })
  if (column === undefined) return
  const didWidthChange = column.width !== width
  if (!didWidthChange) return
  dispatch(
    quotationSlice.actions.updateColWidthReducer({
      itemIndex,
      width,
      boqColumnKey,
    }),
  )
}

export const onColumnResizeStop = ({
  headerColumnElement,
  itemIndex,
  boqColumnKey,
}: Props): void => {
  fixItemImagesHeight()
  const columnWidth = headerColumnElement.clientWidth
  dispatch(
    quotationSlice.actions.updateColWidthReducer({
      itemIndex,
      width: columnWidth,
      boqColumnKey,
    }),
  )
  const itemWidth = headerColumnElement.closest(`.${cls.paper}`)?.clientWidth
  dispatch(
    quotationSlice.actions.updateItemWidthReducer({
      itemIndex,
      width: itemWidth ?? 0,
    }),
  )
  dispatch(quotationSlice.actions.enableFroalaReducer({ itemIndex }))
}
