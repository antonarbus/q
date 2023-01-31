import { SortableElement, SortableElementProps } from 'react-sortable-hoc'

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
        justifyContent: 'center',
        gap: '2px',
        position: 'relative',
        maxWidth: '100%'
      }}
    >
      {children}
    </div>
  )
})
