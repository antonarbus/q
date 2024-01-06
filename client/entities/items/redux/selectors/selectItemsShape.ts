import { createSelector } from '@reduxjs/toolkit'
import type { Item, RootState } from 'client/shared/types'

export const selectItemsShape = createSelector(
  [(state: RootState): Item[] => state.items],
  (items) => items,
  {
    memoizeOptions: {
      // resultEqualityCheck: isEqual
      resultEqualityCheck: (prevItems: Item[], currentItems: Item[]) => {
        const addedOrDeletedItem = prevItems.length !== currentItems.length
        if (addedOrDeletedItem) return false
        const itemsIdsDoNotMatch = prevItems
          .some((item, index) => item.id !== currentItems[index]?.id)
        if (itemsIdsDoNotMatch) return false
        return true
      },
    },
  },
)
