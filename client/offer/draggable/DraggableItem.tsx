import { SortableElement } from 'react-sortable-hoc'
import { DragHandle } from './DragHandle'

type Props = {
  value: React.ReactNode
}

export const DraggableItem = SortableElement(({ value }: Props) => (
  <div
    css={{
      display: 'flex',
      alignItems: 'center',
      margin: '5px',
      padding: '5px',
      border: '1px dotted grey',
      whiteSpace: 'nowrap'
    }}
  >
    <DragHandle />
    {value}
  </div>
))
