
import type { ReactNode } from 'react'
import { useIsItemDisabled } from './useIsItemDisabled'
import { ItemLayout } from 'client/shared/layouts'
import { store } from 'client/shared/clients'
import { DragIcon } from 'client/features/drag_item'
import { CopyIcon } from 'client/features/copy_item/CopyIcon'
import { CutIcon } from 'client/features/cut_item/CutIcon'
import { DeleteIcon } from 'client/features/delete_item/DeleteIcon'
import { ItemMsg } from './ItemMsg'
import { PasteHere } from './PasteHere'

interface IProps {
  index: number
  children: ReactNode
}

export const Item = ({ index, children }: IProps): JSX.Element => {
  const isItemDisabled = useIsItemDisabled()
  const item = store.getState().items[index]

  return (
    <ItemLayout
      index={index} // internal prop consumed by SortableElement HOC
      disabled={isItemDisabled} // internal prop consumed by SortableElement HOC
      i={index}
      itemHeight={item?.height ?? 0}
      itemWidth={item?.width ?? 0}
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
