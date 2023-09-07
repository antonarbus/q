import { itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { useSelectorTyped } from 'client/shared/hooks'
import { useUpdateEffect } from 'react-use'

interface Props {
  itemIndex: number
}

export const useRemoveItemMsgAfterSomeTime = ({ itemIndex }: Props): void => {
  const msg = useSelectorTyped(state => state.items[itemIndex]?.msg)

  useUpdateEffect(() => {
    const timeout = setTimeout(() => {
      if (!msg) return
      dispatch(itemsSlice.actions.removeItemMsg({ itemIndex }))
    }, 1700)

    return () => {
      clearTimeout(timeout)
    }
  })
}
