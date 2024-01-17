import { itemsSlice } from '../../redux/itemsSlice'
import { dispatch } from '@shared/clients'
import { useSelectorTyped } from '@shared/hooks'
import { useItem } from '../../providers/ItemProvider'
import { useUpdateEffect } from 'react-use'

export const useRemoveItemMsgAfterSomeTime = (): void => {
  const { itemIndex } = useItem()
  const msg = useSelectorTyped(state => state.items[itemIndex]?.msg)

  useUpdateEffect(() => {
    const timeout = setTimeout(() => {
      if (!msg) return
      dispatch(itemsSlice.actions.removeItemsMsgReducer())
    }, 1700)

    return () => {
      clearTimeout(timeout)
    }
  })
}
