import { dispatch } from '@lib_instances/store'
import { itemsSlice, saveItemsLocally } from '@entities/items'
import { className } from '@shared/className'
import { type BoqColumnKey } from '@shared/types'

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
  dispatch(itemsSlice.actions.updateColWidthReducer({ itemIndex, width, boqColumnKey }))
}

export const onColumnResizeStop = ({ headerColumnElement, itemIndex, boqColumnKey }: Props): void => {
  const columnWidth = headerColumnElement.clientWidth
  dispatch(itemsSlice.actions.updateColWidthReducer({ itemIndex, width: columnWidth, boqColumnKey }))
  const itemWidth = headerColumnElement.closest(`.${className.paper}`)?.clientWidth
  dispatch(itemsSlice.actions.updateItemWidthReducer({ itemIndex, width: itemWidth ?? 0 }))
  dispatch(itemsSlice.actions.enableFroalaReducer({ itemIndex }))
  saveItemsLocally()
  dispatch(itemsSlice.actions.tellItemSavedLocallyReducer({ itemIndex }))
}
