import { getState } from '@libras/store'
import type { ReactNode } from 'react'
import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from '@shared/types'
import { useIsItemSortDisabled } from '../hooks/useIsItemSortDisabled'
import { useItem } from '../providers/ItemProvider'
import { ItemSortAndAnimate } from './item_layout'
import { ItemMsg } from './item_msg'
import { PasteItemTextOverlay } from './paste_item_overlay_text'

type Props = {
  children: ReactNode
  disableResize?: boolean
  onItemResizeStart?: OnItemResizeStart
  onItemResize?: OnItemResize
  onItemResizeStop?: OnItemResizeStop
  autoWidth?: boolean
  itemActions: JSX.Element
}

export const Item = ({
  children,
  disableResize,
  onItemResizeStart,
  onItemResize,
  onItemResizeStop,
  autoWidth,
  itemActions,
}: Props): JSX.Element => {
  const { itemIndex } = useItem()
  const item = getState().items[itemIndex]
  const isItemSortDisabled = useIsItemSortDisabled()

  return (
    <ItemSortAndAnimate
      index={itemIndex} // "index" is internal prop consumed by SortableElement HOC
      disabled={isItemSortDisabled} // internal prop consumed by SortableElement HOC
      disableResize={disableResize}
      autoWidth={autoWidth}
      itemHeight={item?.height ?? 0}
      itemId={item?.id ?? 'no id'}
      onItemResizeStart={onItemResizeStart}
      onItemResize={onItemResize}
      onItemResizeStop={onItemResizeStop}
      itemActionElements={itemActions}
    >
      <ItemMsg />
      <PasteItemTextOverlay >
        {children}
      </PasteItemTextOverlay>
    </ItemSortAndAnimate>
  )
}
