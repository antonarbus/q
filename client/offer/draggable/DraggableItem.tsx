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
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%'
      }}
    >
      {children}
    </div>
  )
})
