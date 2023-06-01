import { useDispatchTyped } from 'client/store'
import { useEffectOnce } from 'react-use'
import { saveItemHeight } from './itemsSlice'
import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { TRefDiv } from 'client/types'

type TProps = {
  ref: TRefDiv
  index: number
}

//* at defaultItems we should keep item heights to have it in redux by default
//* but i'm lazy to save them and let's just measure height and save it on init render

export const useSaveItemHeightOnInitLoad = ({ ref, index }: TProps) => {
  const dispatch = useDispatchTyped()

  useEffectOnce(function saveHeightOnInitLoad() {
    setTimeout(() => {
      const height = (ref.current as HTMLElement)!.closest('.item-paper')!.clientHeight || 0
      dispatch(saveItemHeight({ index, height }))
      saveItemsIntoLocalStorage()
    }, 1000)
  })
}
