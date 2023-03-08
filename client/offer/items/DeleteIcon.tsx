import { saveOfferIntoLocalStorage } from 'client/modules/localStorage'
import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { ItemType } from 'client/types'
import { RxCross2 } from 'react-icons/rx'
import { deleteItem } from '../offerSlice'

type Props = {
  itemToDelete: ItemType
}

export const DeleteIcon = ({ itemToDelete }: Props) => {
  const dispatch = useDispatchTyped()
  const isLastItem = useSelectorTyped(state => state.offer.items.filter((item) => item.type !== 'paste').length === 1)

  return (
    <RxCross2
      css={{
        color: isLastItem ? '#acacac' : 'inherit',
        cursor: isLastItem ? 'default' : 'pointer',
        ...(!isLastItem && {
          ':hover': {
            scale: '1.3',
            color: 'black',
            transition: 'scale 200ms'
          }
        })
      }}
      onClick={() => {
        if (isLastItem) return
        dispatch(deleteItem(itemToDelete))
        saveOfferIntoLocalStorage()
      }}
    />
  )
}
