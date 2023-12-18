import { itemsSlice } from 'client/entities/items'
import { dispatch, getState } from 'client/shared/clients'
import { saveItemsLocally } from 'client/shared/lib'
import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from 'client/shared/types'

export const onBoqItemResizeStart: OnItemResizeStart = ({ itemIndex, e, dir, elementRef: itemElement }) => {
  // not 'auto' anymore, otherwise col jumps
  // in ResizablePaper comp width will be set back to "auto" after re-render
  itemElement.style.width = itemElement.clientWidth + 'px'

  dispatch(itemsSlice.actions.disableFroala({ itemIndex }))

  dispatch(itemsSlice.actions.saveColWidth({
    itemIndex,
    boqColumnKey: 'description',
    width: undefined,
  }))
}

export const onBoqItemResize: OnItemResize = ({ itemIndex, e, direction, elementRef: itemElement, delta }) => {
  dispatch(itemsSlice.actions.saveItemWidth({ itemIndex, width: itemElement.clientWidth }))
}

export const onBoqItemResizeStop: OnItemResizeStop = ({ itemIndex, e, direction, elementRef: itemElement, delta }) => {
  const descriptionHeaderElement = itemElement.querySelector('.th.description')
  if (!(descriptionHeaderElement instanceof HTMLElement)) return

  const descriptionColWidth = descriptionHeaderElement.clientWidth

  dispatch(itemsSlice.actions.saveColWidth({
    itemIndex,
    boqColumnKey: 'description',
    width: descriptionColWidth,
  }))

  dispatch(itemsSlice.actions.enableFroala({ itemIndex }))

  // setTimeout to make save the width after it will become back to "width: auto"
  // on ResizablePaper component render
  // probably there is a better way to do it, but I am lazy now
  setTimeout(() => {
    const itemWidth = itemElement.clientWidth
    const prevItemWidth = getState().items[itemIndex]?.width

    if (itemWidth !== prevItemWidth) {
      dispatch(itemsSlice.actions.saveItemWidth({ itemIndex, width: itemWidth }))
    }

    saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
  }, 50)
}
