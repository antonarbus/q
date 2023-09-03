
import type { ReactNode } from 'react'
import { useIsItemDisabled } from './useIsItemDisabled'
import { getState, store } from 'client/shared/clients'
import { DragIcon } from 'client/features/drag_item'
import { CopyIcon } from 'client/features/copy_item/CopyIcon'
import { CutIcon } from 'client/features/cut_item/CutIcon'
import { DeleteIcon } from 'client/features/delete_item/DeleteIcon'
import { ItemMsg } from './ItemMsg'
import { PasteHere } from './PasteHere'
import { ItemLayout } from './item_layout'
import type { OnItemResize, OnItemResizeStart, OnItemResizeStop } from 'client/shared/types'

interface Props {
  index: number
  children: ReactNode
  disableResize?: boolean
  onItemResizeStop?: OnItemResizeStop
  onItemResize?: OnItemResize
  onItemResizeStart?: OnItemResizeStart
  autoWidth?: boolean
}

export const Item = ({
  index,
  children,
  disableResize,
  onItemResizeStop,
  onItemResize,
  onItemResizeStart,
  autoWidth,
}: Props): JSX.Element => {
  const isItemDisabled = useIsItemDisabled()
  const item = getState().items[index]

  return (
    <ItemLayout
      index={index} // internal prop consumed by SortableElement HOC
      disabled={isItemDisabled} // internal prop consumed by SortableElement HOC
      i={index}
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
          <CopyIcon index={index} />
          <CutIcon index={index} />
          <DeleteIcon index={index} />
        </>
      )}
    >
      <ItemMsg index={index} />
      <PasteHere index={index}>
        {children}
      </PasteHere>
    </ItemLayout>
  )
}
