import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from 'client/shared/types'
import type { ReactNode } from 'react'
import { useIsItemDisabled } from './useIsItemDisabled'
import { getState } from 'client/shared/clients'
import { DragIcon } from 'client/features/drag_item'
import { CopyIcon } from 'client/features/copy_item/CopyIcon'
import { CutIcon } from 'client/features/cut_item/CutIcon'
import { DeleteIcon } from 'client/features/delete_item/DeleteIcon'
import { ItemMsg } from './ItemMsg'
import { PasteHere } from './PasteHere'
import { ItemLayout } from './item_layout'

type Props = {
  itemIndex: number
  children: ReactNode
  disableResize?: boolean
  onItemResizeStop?: OnItemResizeStop
  onItemResize?: OnItemResize
  onItemResizeStart?: OnItemResizeStart
  autoWidth?: boolean
}

export const Item = ({
  itemIndex,
  children,
  disableResize,
  onItemResizeStop,
  onItemResize,
  onItemResizeStart,
  autoWidth,
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
      itemActionElements={(
        <>
          <DragIcon />
          <CopyIcon itemIndex={itemIndex} />
          <CutIcon itemIndex={itemIndex} />
          <DeleteIcon itemIndex={itemIndex} />
        </>
      )}
    >
      <ItemMsg itemIndex={itemIndex} />
      <PasteHere itemIndex={itemIndex}>
        {children}
      </PasteHere>
    </ItemLayout>
  )
}
