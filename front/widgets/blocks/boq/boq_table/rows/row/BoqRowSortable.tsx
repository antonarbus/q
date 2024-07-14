import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useRow } from '@entities/quotation'

type Props = {
  children: React.ReactNode
}

export const BoqRowSortable = ({ children }: Props): JSX.Element => {
  const { rowId } = useRow()
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: rowId,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 1000 : 0,
      }}
    >
      {children}
    </div>
  )
}
