import { motion } from 'framer-motion'
import { MdDragIndicator } from 'react-icons/md'
import { SortableHandle } from 'react-sortable-hoc'
import { useIsBoqRowSortDisabled } from '@entities/items/hooks/useIsBoqRowSortDisabled'

const Handle = (): JSX.Element => {
  const isDisabled = useIsBoqRowSortDisabled()

  return (
    <motion.span
      whileHover={{ scale: isDisabled ? 1 : 2.3 }}
      style={{
        color: isDisabled ? '#acacac' : '#000',
        cursor: isDisabled ? 'default' : 'move',
      }}
      tabIndex={-1}
    >
      <MdDragIndicator />
    </motion.span>
  )
}

export const DragBoqRow = SortableHandle(Handle)
