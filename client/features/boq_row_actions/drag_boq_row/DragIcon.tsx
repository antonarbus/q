import { SortableHandle } from 'react-sortable-hoc'
import { MdDragIndicator } from 'react-icons/md'
import { useSelectorTyped } from 'client/shared/hooks'
import { motion } from 'framer-motion'
import { selectIsLastBoqRow } from 'client/entities/items'

type Props = {
  itemIndex: number
}

const Handle = ({ itemIndex }: Props): JSX.Element => {
  const isCopyMode = useSelectorTyped(state => state.copy.isCopyMode)
  const isBoqRowAlone = useSelectorTyped(selectIsLastBoqRow({ itemIndex }))
  const isDisabled = isCopyMode || isBoqRowAlone

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
