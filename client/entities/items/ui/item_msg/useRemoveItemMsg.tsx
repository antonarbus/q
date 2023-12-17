import { itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { useSelectorTyped } from 'client/shared/hooks'
import { useItemIndex } from 'client/widgets/items/ItemIndexProvider'
import { useUpdateEffect } from 'react-use'

export const useRemoveItemMsgAfterSomeTime = (): void => {
  const { itemIndex } = useItemIndex()
  const msg = useSelectorTyped(state => state.items[itemIndex]?.msg)

  useUpdateEffect(() => {
    const timeout = setTimeout(() => {
      if (!msg) return
      dispatch(itemsSlice.actions.removeItemsMsg())
    }, 1700)

    return () => {
      clearTimeout(timeout)
    }
  })
}
