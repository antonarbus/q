
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

interface Props {
  index: number
  children: ReactNode
}

export const Item = ({ index, children }: Props): JSX.Element => {
  const isItemDisabled = useIsItemDisabled()
  const item = getState().items[index]

  return (
    <ItemLayout
      index={index} // internal prop consumed by SortableElement HOC
      disabled={isItemDisabled} // internal prop consumed by SortableElement HOC
      i={index}
      itemHeight={item?.height ?? 0}
      itemId={item?.id ?? 'no id'}
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
