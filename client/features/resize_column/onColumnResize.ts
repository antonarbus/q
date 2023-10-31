import { itemsSlice } from 'client/entities/items'
import { className } from 'client/shared/className'
import { dispatch } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import { type BoqCols } from 'client/shared/types'

type Props = {
  headerColumnElement: HTMLElement
  itemIndex: number
  headerName: keyof BoqCols
}

export const onColumnResizeStart = ({ headerColumnElement, itemIndex, headerName }: Props): void => {
  const width = headerColumnElement.clientWidth
  dispatch(itemsSlice.actions.saveColWidth({ itemIndex, width, headerName }))
}

export const onColumnResize = ({ headerColumnElement, itemIndex, headerName }: Props): void => {
  const width = headerColumnElement.clientWidth
  dispatch(itemsSlice.actions.saveColWidth({ itemIndex, width, headerName }))
}

export const onColumnResizeStop = ({ headerColumnElement, itemIndex, headerName }: Props): void => {
  const columnWidth = headerColumnElement.clientWidth
  dispatch(itemsSlice.actions.saveColWidth({ itemIndex, width: columnWidth, headerName }))
  const itemWidth = headerColumnElement.closest(`.${className.paper}`)?.clientWidth
  dispatch(itemsSlice.actions.saveItemWidth({ itemIndex, width: itemWidth ?? 0 }))
  saveItemsLocally()
  dispatch(itemsSlice.actions.tellItemSavedLocally({ itemIndex }))
}
