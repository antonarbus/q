import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { ItemType } from 'client/types'
import { RxCross2 } from 'react-icons/rx'
import { deleteItem } from '../offerSlice'

type Props = {
  itemToDelete: ItemType
}

export const DeleteIcon = ({ itemToDelete }: Props) => {
  const dispatch = useDispatchTyped()
  const isPasteMode = useSelectorTyped(state => state.copy.isShown)

  return (
    <RxCross2
      css={{
        color: isPasteMode ? '#acacac' : 'inherit',
        cursor: isPasteMode ? 'default' : 'pointer',
        ...(!isPasteMode && {
          ':hover': {
            scale: '1.3',
            color: 'black',
            transition: 'scale 200ms'
          }
        })
      }}
      onClick={() => {
        dispatch(deleteItem(itemToDelete))
      }}
    />
  )
}
