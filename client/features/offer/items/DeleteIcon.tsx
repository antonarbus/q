import { saveOfferIntoLocalStorage } from 'client/modules/localStorage'
import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { RxCross2 } from 'react-icons/rx'
import { deleteItem, selectIsLastItem } from '../offerSlice'
import { ItemType } from '../types'

type Props = {
  itemToDelete: ItemType
}

export const DeleteIcon = ({ itemToDelete }: Props) => {
  const dispatch = useDispatchTyped()
  const isLastItem = useSelectorTyped(selectIsLastItem)

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
