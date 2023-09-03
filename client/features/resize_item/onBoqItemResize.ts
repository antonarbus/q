import { itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { OnItemResizeStart, OnItemResizeStop } from 'client/shared/types'

export const onBoqItemResizeStart: OnItemResizeStart = ({ index, e, dir, elementRef }) => {
  const descriptionHeader = elementRef.querySelector('.th.description')

  if (!descriptionHeader) return
  if (!(descriptionHeader instanceof HTMLElement)) return

  elementRef.style.width = elementRef.clientWidth + 'px' // otherwise col jumps
  dispatch(itemsSlice.actions.saveColWidth({ index, headerName: 'description', width: undefined }))
}

export const onBoqItemResizeStop: OnItemResizeStop = ({ index, e, direction, elementRef, delta }) => {
  const descriptionHeader = elementRef.querySelector('.th.description')

  if (!descriptionHeader) return
  if (!(descriptionHeader instanceof HTMLElement)) return

  const width = descriptionHeader.clientWidth

  dispatch(itemsSlice.actions.saveColWidth({ index, headerName: 'description', width }))
  saveItemsLocally({ msgAboveItemWithIndex: index })
}
