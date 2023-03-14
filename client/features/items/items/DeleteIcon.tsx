import { saveOfferIntoLocalStorage } from 'client/modules/localStorage'
import { useDispatchTyped, useSelectorTyped } from 'client/store'
import { RxCross2 } from 'react-icons/rx'
import { deleteItem, selectIsLastItem } from '../itemsSlice'
import { ItemType } from '../types'
import { motion } from 'framer-motion'

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
        saveOfferIntoLocalStorage()
      }}
    >
      <RxCross2 />
    </motion.span>
  )
}
