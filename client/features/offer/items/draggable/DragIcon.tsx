import { SortableHandle } from 'react-sortable-hoc'
import { MdDragIndicator } from 'react-icons/md'
import { useSelectorTyped } from 'client/store'
import { selectIsLastItem } from '../../offerSlice'

const Handle = () => {
  const isPasteMode = useSelectorTyped(state => state.copy.isShown)
  const isLastItem = useSelectorTyped(selectIsLastItem)
  const isDisabled = isPasteMode || isLastItem

  return (
    <MdDragIndicator
      css={{
        color: !isDisabled ? 'inherit' : '#acacac',
        cursor: !isDisabled ? 'pointer' : 'default',
        ...(!isDisabled && {
          ':hover': {
            scale: '1.3',
            color: 'black',
            transition: 'scale 200ms'
          }
        })
      }}
    />
  )
}

export const DragIcon = SortableHandle(Handle)
