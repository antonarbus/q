import { dispatch, getState } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { useEffectOnce, useUnmount } from 'react-use'
import { copySlice } from '@entities/copy'
import { type CopyableItem, getBoqItemFromStore, itemsSlice, saveItemsLocally, boqRowType, isItemsFroalaSignal } from '@entities/items'
import { markAsNotSaved } from '@shared/isSaved'
import { nanoid } from '@shared/lib/nanoid'

export const usePasteClick = (): void => {
  useEffectOnce(() => {
    document.addEventListener('click', pasteItemOnClick)
  })

  useUnmount((): void => {
    document.removeEventListener('click', pasteItemOnClick)
  })
}

function pasteItemOnClick(): void {
  const isPasteTextShown = getState().copy.isPasteTextShown

  if (!isPasteTextShown) return

  dispatch(copySlice.actions.hidePasteText())

  const isPastable = getState().copy.isPastable

  if (!isPastable) return

  const { itemId, pastePos } = getState().copy.place
  const topItemFromCopyContainer = getState().copy.items[0]

  if (!topItemFromCopyContainer) return

  const newItemId = nanoid(3)

  dispatch(itemsSlice.actions.pasteItemReducer({
    item: topItemFromCopyContainer,
    itemId,
    newItemId,
    pastePos,
  }))

  dispatch(copySlice.actions.removeItemFromCopyContainer())
  dispatch(copySlice.actions.forbidAllActions())

  setTimeout(() => {
    dispatch(copySlice.actions.allowAllActions())
    saveItemsLocally({ msgAboveItemWithIndex: getIndexWhereToShowMsg({ newItemId, topItemFromCopyContainer }) })
    markAsNotSaved()
  }, 1000 * theme.item.animationDuration)

  const itemsInCopyContainer = getState().copy.items

  if (itemsInCopyContainer.length === 0) {
    dispatch(copySlice.actions.hideCopyContainer())
    dispatch(itemsSlice.actions.removePasteItemReducer())

    // * need more time than animation, otherwise some distortion is visible
    setTimeout(() => {
      isItemsFroalaSignal.value = true
    }, 1000 * theme.item.animationDuration + 500)
  }
}

function getIndexWhereToShowMsg({ newItemId, topItemFromCopyContainer }: {
  newItemId: string
  topItemFromCopyContainer: CopyableItem
}): number {
  if (topItemFromCopyContainer.type !== boqRowType.row) {
    const pastedAtItemIndex = getState().items.findIndex(item => item.id === newItemId)
    return pastedAtItemIndex
  }

  if (topItemFromCopyContainer.type === boqRowType.row) {
    let pastedAtItemIndex = -1
    getState().items.forEach((item, itemIndex) => {
      const boqItem = getBoqItemFromStore({ itemIndex })
      if (boqItem === undefined) return
      const pastedRow = boqItem.boq.rows.find(boqRow => boqRow.id === newItemId)
      if (pastedRow !== undefined) {
        pastedAtItemIndex = itemIndex
      }
    })

    return pastedAtItemIndex
  }

  return -1
}
