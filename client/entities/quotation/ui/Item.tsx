import { getState } from '@lib_instances/store'
import { type ResizableProps } from 're-resizable'
import type { ReactNode } from 'react'
import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from '@shared/types'
import { useIsItemSortDisabled } from '../hooks/useIsItemSortDisabled'
import { useItem } from '../providers/ItemProvider'
import { ItemSortAndAnimate } from './item_layout'
import { PasteItemTextOverlay } from './paste_item_overlay_text'

type Props = {
  children: ReactNode
  disableResize?: boolean
  onItemResizeStart?: OnItemResizeStart
  onItemResize?: OnItemResize
  onItemResizeStop?: OnItemResizeStop
  autoWidth?: boolean
  minWidth?: ResizableProps['minWidth']
  leftItemActionButtons: JSX.Element
  rightItemActionButtons: JSX.Element
}

export const Item = ({
  children,
  disableResize,
  onItemResizeStart,
  onItemResize,
  onItemResizeStop,
  autoWidth,
  minWidth,
  leftItemActionButtons,
  rightItemActionButtons,
}: Props): JSX.Element => {
  const { itemIndex } = useItem()
  const item = getState().quotation[itemIndex]
  const isItemSortDisabled = useIsItemSortDisabled()

  return (
    <ItemSortAndAnimate
      index={itemIndex} // "index" is internal prop consumed by SortableElement HOC
      disabled={isItemSortDisabled} // internal prop consumed by SortableElement HOC
      disableResize={disableResize}
      autoWidth={autoWidth}
      minWidth={minWidth}
      itemHeight={item?.height ?? 0}
      itemId={item?.id ?? 'no id'}
      onItemResizeStart={onItemResizeStart}
      onItemResize={onItemResize}
      onItemResizeStop={onItemResizeStop}
      leftItemActionButtons={leftItemActionButtons}
      rightItemActionButtons={rightItemActionButtons}
    >
      <PasteItemTextOverlay >
        {children}
      </PasteItemTextOverlay>
    </ItemSortAndAnimate>
  )
}
