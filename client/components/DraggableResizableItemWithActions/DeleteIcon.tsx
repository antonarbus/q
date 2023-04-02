import { saveItemsIntoLocalStorage } from 'client/modules/localStorage'
import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { RxCross2 } from 'react-icons/rx'
import { motion } from 'framer-motion'
import { ItemType } from '../../features/items/types'
import { deleteItem, selectIsLastItem } from '../../features/items/itemsSlice'
import { resetMsgOnBottom, showMsgOnBottom } from 'client/features/bottom msg/bottomMsgSlice'

type Props = {
  itemToDelete: ItemType
}

export const DeleteIcon = ({ itemToDelete }: Props) => {
  const dispatch = useDispatchTyped()
  const isLastItem = useSelectorTyped(selectIsLastItem)

  return (
    <motion.span
      whileHover={{ scale: isLastItem ? 1 : 1.3 }}
      whileTap={{ scale: 1 }}
      style={{
        color: isLastItem ? '#acacac' : '#000',
        cursor: isLastItem ? 'default' : 'pointer',
      }}
      onClick={() => {
        if (isLastItem) return
        dispatch(deleteItem(itemToDelete))
        saveItemsIntoLocalStorage()
        dispatch(showMsgOnBottom('saved locally'))
        setTimeout(() => {
          dispatch(resetMsgOnBottom())
        }, 1500)
      }}
    >
      <RxCross2 />
    </motion.span>
  )
}
