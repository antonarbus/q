import { dispatch } from '@lib_instances/store'
import { type BoqColumnKey, itemsSlice, saveItemsLocally, getBoqHeaderFromStore, getBoqColumnHtmlFromStore, getBoqColumnFromStore } from '@entities/items'
import { className } from '@shared/consts/className'

type Props = {
  headerColumnElement: HTMLElement
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const onColumnResizeStart = ({ headerColumnElement, itemIndex, boqColumnKey }: Props): void => {
  const width = headerColumnElement.clientWidth
  dispatch(itemsSlice.actions.disableFroalaReducer({ itemIndex }))
  dispatch(itemsSlice.actions.updateColWidthReducer({ itemIndex, width, boqColumnKey }))
  dispatch(itemsSlice.actions.hideBoqItemPinsReducer({ itemIndex }))
}

export const onColumnResize = ({ headerColumnElement, itemIndex, boqColumnKey }: Props): void => {
  const width = headerColumnElement.clientWidth
  const column = getBoqColumnFromStore({ itemIndex, boqColumnKey })
  if (column === undefined) return
  const didWidthChange = column.width !== width
  if (!didWidthChange) return
  dispatch(itemsSlice.actions.updateColWidthReducer({ itemIndex, width, boqColumnKey }))
}

export const onColumnResizeStop = ({ headerColumnElement, itemIndex, boqColumnKey }: Props): void => {
  const columnWidth = headerColumnElement.clientWidth
  dispatch(itemsSlice.actions.updateColWidthReducer({ itemIndex, width: columnWidth, boqColumnKey }))
  const itemWidth = headerColumnElement.closest(`.${className.paper}`)?.clientWidth
  dispatch(itemsSlice.actions.updateItemWidthReducer({ itemIndex, width: itemWidth ?? 0 }))
  dispatch(itemsSlice.actions.enableFroalaReducer({ itemIndex }))
  saveItemsLocally()
}
