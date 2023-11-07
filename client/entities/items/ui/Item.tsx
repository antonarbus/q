import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from 'client/shared/types'
import type { ReactNode } from 'react'
import { getState } from 'client/shared/clients'
import { useIsItemDisabled } from '../hooks/useIsItemDisabled'
import { ItemLayout } from './item_layout'
import { ItemMsg } from './item_msg'
import { PasteHere } from './item_paste_text'

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
  const isItemDisabled = useIsItemDisabled()
  const item = getState().items[itemIndex]

  return (
    <ItemLayout
      index={itemIndex} // "index" is internal prop consumed by SortableElement HOC
      disabled={isItemDisabled} // internal prop consumed by SortableElement HOC
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
      <PasteHere itemIndex={itemIndex}>
        {children}
      </PasteHere>
    </ItemLayout>
  )
}
