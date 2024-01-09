import { SortableHandle } from 'react-sortable-hoc'
import { MdDragIndicator } from 'react-icons/md'
import { motion } from 'framer-motion'
// todo: obviously need to move items into entities
import { useIsBoqRowSortDisabled } from 'client/entities/items/hooks/useIsBoqRowSortDisabled'

const Handle = (): JSX.Element => {
  const isDisabled = useIsBoqRowSortDisabled()

  return (
    <motion.span
      whileHover={{ scale: isDisabled ? 1 : 2.3 }}
      style={{
        color: isDisabled ? '#acacac' : '#000',
        cursor: isDisabled ? 'default' : 'move',
      }}
    >
      <MdDragIndicator />
    </motion.span>
  )
}

export const DragBoqRow = SortableHandle(Handle)
