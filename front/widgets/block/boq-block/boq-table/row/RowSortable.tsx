import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useRow } from '@entities/quotation/provider/RowProvider'

import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const RowSortable = (props: Props): JSX.Element => {
  const row = useRow()

  const sortable = useSortable({
    id: row.item.id,
  })

  return (
    <div
      ref={sortable.setNodeRef}
      style={{
        transform: CSS.Translate.toString(sortable.transform),
        transition: sortable.transition,
        zIndex: sortable.isDragging === true ? 1000 : 0,
      }}
    >
      {props.children}
    </div>
  )
}
