import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useRow } from '@entities/quotation'
import type { JSX,ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const BoqRowSortable = ({ children }: Props): JSX.Element => {
  const { row } = useRow()

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging === true ? 1000 : 0,
      }}
    >
      {children}
    </div>
  )
}
