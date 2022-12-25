import { SortableElement, SortableElementProps } from 'react-sortable-hoc'
import { DragHandle } from './DragHandle'

type Props = {
  children: React.ReactNode
}

interface ISortableItem extends SortableElementProps {
  children: React.ReactNode
}

export const DraggableItem: React.ComponentClass<ISortableItem, any> = SortableElement(({ children }: Props) => {
  return (
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
      {children}
    </div>
  )
})
