import { SortableHandle } from 'react-sortable-hoc'
import { MdDragIndicator } from 'react-icons/md'
import { motion } from 'framer-motion'
// todo: obviously need to move items into entities
import { useIsBoqRowSortDisabled } from 'client/widgets/items/boq/table/rows/useIsBoqRowSortDisabled'

type Props = {
  itemIndex: number
}

const Handle = ({ itemIndex }: Props): JSX.Element => {
  const isDisabled = useIsBoqRowSortDisabled({ itemIndex })

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

export const DragBoqRow = SortableHandle<Props>(Handle)
