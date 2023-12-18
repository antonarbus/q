import { appSlice } from 'client/entities/app'
import { itemsSlice } from 'client/entities/items'
import { className } from 'client/shared/className'
import { dispatch } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import { type BoqColumnKey } from 'client/shared/types'

type Props = {
  headerColumnElement: HTMLElement
  itemIndex: number
  boqColumnKey: BoqColumnKey
}

export const onColumnResizeStart = ({ headerColumnElement, itemIndex, boqColumnKey }: Props): void => {
  const width = headerColumnElement.clientWidth
  dispatch(itemsSlice.actions.disableFroala({ itemIndex }))
  dispatch(itemsSlice.actions.saveColWidth({ itemIndex, width, boqColumnKey }))
}

export const onColumnResize = ({ headerColumnElement, itemIndex, boqColumnKey }: Props): void => {
  const width = headerColumnElement.clientWidth
  dispatch(itemsSlice.actions.saveColWidth({ itemIndex, width, boqColumnKey }))
}

export const onColumnResizeStop = ({ headerColumnElement, itemIndex, boqColumnKey }: Props): void => {
  const columnWidth = headerColumnElement.clientWidth
  dispatch(itemsSlice.actions.saveColWidth({ itemIndex, width: columnWidth, boqColumnKey }))
  const itemWidth = headerColumnElement.closest(`.${className.paper}`)?.clientWidth
  dispatch(itemsSlice.actions.saveItemWidth({ itemIndex, width: itemWidth ?? 0 }))
  dispatch(itemsSlice.actions.enableFroala({ itemIndex }))
  saveItemsLocally()
  dispatch(itemsSlice.actions.tellItemSavedLocally({ itemIndex }))
}
