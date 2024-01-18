import { dispatch } from '@libras/store'
import { useUpdateEffect } from 'react-use'
import { useSelectorTyped } from '@shared/hooks'
import { useItem } from '../../providers/ItemProvider'
import { itemsSlice } from '../../redux/itemsSlice'

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
