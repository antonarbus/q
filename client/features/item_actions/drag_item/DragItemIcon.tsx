import { SortableHandle } from 'react-sortable-hoc'
import { MdDragIndicator } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useIsItemSortDisabled } from '@entities/items'

const Handle = (): JSX.Element => {
  const isDisabled = useIsItemSortDisabled()

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

export const DragItemIcon = SortableHandle(Handle)
