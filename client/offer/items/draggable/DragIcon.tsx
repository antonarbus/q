import { SortableHandle } from 'react-sortable-hoc'
import { MdDragIndicator } from 'react-icons/md'
import { useSelectorTyped } from 'client/store'

const Handle = () => {
  const isPasteMode = useSelectorTyped(state => state.copy.isShown)

  return (
    <MdDragIndicator
      css={{
        color: !isPasteMode ? 'inherit' : '#acacac',
        cursor: !isPasteMode ? 'pointer' : 'default',
        ...(!isPasteMode && {
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
