import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from 'client/shared/types'
import type { ReactNode } from 'react'
import { getState } from 'client/shared/clients'
import { useIsItemSortDisabled } from '../hooks/useIsItemSortDisabled'
import { ItemSortAndAnimate } from './item_layout'
import { ItemMsg } from './item_msg'
import { PasteItemTextOverlay } from './paste_item_overlay_text'

type Props = {
  itemIndex: number
  children: ReactNode
  disableResize?: boolean
  onItemResizeStop?: OnItemResizeStop
  onItemResize?: OnItemResize
  onItemResizeStart?: OnItemResizeStart
  autoWidth?: boolean
  itemActions: JSX.Element
}

export const Item = ({
  itemIndex,
  children,
  disableResize,
  onItemResizeStop,
  onItemResize,
  onItemResizeStart,
  autoWidth,
  itemActions,
}: Props): JSX.Element => {
  const item = getState().items[itemIndex]
  const isItemSortDisabled = useIsItemSortDisabled()

  return (
    <ItemSortAndAnimate
      index={itemIndex} // "index" is internal prop consumed by SortableElement HOC
      disabled={isItemSortDisabled} // internal prop consumed by SortableElement HOC
      itemIndex={itemIndex}
      disableResize={disableResize}
      autoWidth={autoWidth}
      itemHeight={item?.height ?? 0}
      itemId={item?.id ?? 'no id'}
      onItemResizeStop={onItemResizeStop}
      onItemResize={onItemResize}
      onItemResizeStart={onItemResizeStart}
      itemActionElements={itemActions}
    >
      <ItemMsg itemIndex={itemIndex} />
      <PasteItemTextOverlay itemIndex={itemIndex}>
        {children}
      </PasteItemTextOverlay>
    </ItemSortAndAnimate>
  )
}
