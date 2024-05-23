import { dispatch } from '@lib_instances/store'
import { cls } from '@shared/consts/cls'
import { quotationSlice } from '../redux/quotationSlice'

type Props = {
  itemIndex: number
}

export const saveItemHeightByIndex = ({ itemIndex }: Props): void => {
  const items = document.querySelectorAll(`.${cls.paper}`)
  const item = items[itemIndex]
  if (!item) return
  const height = item.clientHeight
  dispatch(
    quotationSlice.actions.updateItemHeightReducer({ itemIndex, height }),
  )
}
