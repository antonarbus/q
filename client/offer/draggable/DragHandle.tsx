import { SortableHandle } from 'react-sortable-hoc'
import { MdDragIndicator } from 'react-icons/md'

const Handle = () => (
  <span
    css={{
      display: 'inlineFlex',
      alignItems: 'center',
      cursor: 'move'
    }}
  >
    <MdDragIndicator />
  </span>
)

export const DragHandle = SortableHandle(Handle)
