import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { store, useDispatchTyped, useSelectorTyped } from 'client/store'
import { RxCross2 } from 'react-icons/rx'
import { deleteItem, selectIsLastItem } from '../../features/items/itemsSlice'
import { tellItemsSavedLocally } from 'client/features/bottom msg/bottomMsgSlice'

type Props = {
  index: number
}

export const DeleteIcon = ({ index }: Props) => {
  const dispatch = useDispatchTyped()
  const isLastItem = useSelectorTyped(selectIsLastItem)

  return (
    <span
      css={{
        color: isLastItem ? '#acacac' : '#000',
        cursor: isLastItem ? 'default' : 'pointer',
        '&:hover': {
          scale: isLastItem ? '1' : '1.3',
          color: isLastItem ? '#acacac' : '#d25959',
          transition: 'scale 200ms, color 200ms'
        }
      }}
      onClick={() => {
        if (isLastItem) return
        const itemToDelete = store.getState().items[index]
        dispatch(deleteItem(itemToDelete))
        saveItemsIntoLocalStorage()
        dispatch(tellItemsSavedLocally())
      }}
    >
      <RxCross2 />
    </span>
  )
}
