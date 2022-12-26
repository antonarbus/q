import { SortableHandle } from 'react-sortable-hoc'
import { MdDragIndicator } from 'react-icons/md'

const Handle = () => (
  <span
    css={{
      // display: 'inlineFlex',
      // alignItems: 'center',
      cursor: 'move',
      // position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1
    }}
  >
    <MdDragIndicator />
  </span>
)

export const DragHandle = SortableHandle(Handle)
