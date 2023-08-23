import { itemsSlice } from 'client/entities/items'
import { dispatch } from 'client/shared/clients'
import { useSelectorTyped } from 'client/shared/hooks'
import { useUpdateEffect } from 'react-use'

interface Props {
  index: number
}

export const useRemoveItemMsgAfterSomeTime = ({ index }: Props): void => {
  const msg = useSelectorTyped(state => state.items[index]?.msg)

  useUpdateEffect(() => {
    const timeout = setTimeout(() => {
      if (!msg) return
      dispatch(itemsSlice.actions.removeItemMsg({ index }))
    }, 1700)

    return () => {
      clearTimeout(timeout)
    }
  })
}
