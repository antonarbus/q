import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { getState } from '@lib_instances/store'
import { type ResizableProps } from 're-resizable'
import type { ReactNode } from 'react'
import {
  type OnItemResize,
  type OnItemResizeStop,
  type OnItemResizeStart,
} from '@shared/types/resizablePaper'
import { useItem } from '../providers/ItemProvider'
import { ItemAnimate } from './item_layout'
import { PasteItemTextOverlay } from './paste_item_overlay_text'

type Props = {
  children: ReactNode
  disableResize?: boolean
  onItemResizeStart?: OnItemResizeStart
  onItemResize?: OnItemResize
  onItemResizeStop?: OnItemResizeStop
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  leftItemActionButtons: ReactNode
  rightItemActionButtons: ReactNode
  className?: string
}

export const ItemComp = ({
  children,
  disableResize,
  onItemResizeStart,
  onItemResize,
  onItemResizeStop,
  autoWidth,
  minWidth,
  leftItemActionButtons,
  rightItemActionButtons,
  className,
}: Props): JSX.Element => {
  const { itemIndex } = useItem()
  const block = getState().quotation.blocks[itemIndex]
  const { itemId } = useItem()

  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: itemId,
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
      <ItemAnimate
        disableResize={disableResize}
        autoWidth={autoWidth}
        minWidth={minWidth}
        itemHeight={block?.height ?? 0}
        itemId={block?.id ?? 'no id'}
        onItemResizeStart={onItemResizeStart}
        onItemResize={onItemResize}
        onItemResizeStop={onItemResizeStop}
        leftItemActionButtons={leftItemActionButtons}
        rightItemActionButtons={rightItemActionButtons}
        className={className}
      >
        <PasteItemTextOverlay>{children}</PasteItemTextOverlay>
      </ItemAnimate>
    </div>
  )
}
