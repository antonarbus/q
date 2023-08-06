import { useDispatchTyped, useSelectorTyped } from 'client/shared/hooks'
import { useUpdateEffect } from 'react-use'
import { removeItemMsg } from '../../model/itemsSlice'

interface IProps {
  index: number
}

export const useRemoveItemMsgAfterSomeTime = ({ index }: IProps): void => {
  const dispatch = useDispatchTyped()
  const msg = useSelectorTyped(state => state.items[index]?.msg)

  useUpdateEffect(() => {
    const timeout = setTimeout(() => {
      if (!msg) return
      dispatch(removeItemMsg({ index }))
    }, 1700)

    return () => {
      clearTimeout(timeout)
    }
  })
}
