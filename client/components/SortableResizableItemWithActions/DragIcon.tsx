import { SortableHandle } from 'react-sortable-hoc'
import { MdDragIndicator } from 'react-icons/md'
import { useSelectorTyped } from 'client/store'
import { selectIsLastItem } from '../../features/items/itemsSlice'
import { motion } from 'framer-motion'

const Handle = () => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  const isLastItem = useSelectorTyped(selectIsLastItem)
  const isDisabled = isCopyMode || isLastItem

  return (
    <motion.span
      whileHover={{ scale: isDisabled ? 1 : 1.3 }}
      style={{
        color: isDisabled ? '#acacac' : '#000',
        cursor: isDisabled ? 'default' : 'move',
      }}
    >
      <MdDragIndicator />
    </motion.span>
  )
}

export const DragIcon = SortableHandle(Handle)
