import { dispatch, useSelectorTyped } from '@lib_instances/store'
import { useUpdateEffect } from 'react-use'
import { useItem } from '../../providers/ItemProvider'
import { itemsSlice } from '../../redux/itemsSlice'

const msgDuration = 2000

export const useRemoveItemMsgAfterSomeTime = (): void => {
  const { itemIndex } = useItem()
  const msg = useSelectorTyped(state => state.items[itemIndex]?.msg)

  useUpdateEffect(() => {
    const timeout = setTimeout(() => {
      if (!msg) return
      dispatch(itemsSlice.actions.removeItemsMsgReducer())
    }, msgDuration)

    return () => {
      clearTimeout(timeout)
    }
  })
}
