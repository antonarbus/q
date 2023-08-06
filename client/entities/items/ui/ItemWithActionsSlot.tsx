
import { useIsDisabledItem } from './useIsDisabledItem'
import { ItemLayout } from 'client/shared/layouts'
import { store } from 'client/shared/clients'
import type { ReactNode } from 'react'
import { DragIcon } from '../../../features/drag_item/DragIcon'
import { CopyIcon } from '../../../features/copy_item/CopyIcon'
import { CutIcon } from '../../../features/cut_item/CutIcon'
import { DeleteIcon } from '../../../features/delete_item/DeleteIcon'
import { Msg } from './Msg'
import { PasteHere } from './PasteHere'

interface IProps {
  index: number
  children: ReactNode
}

export const ItemWithActionsSlot = ({ index, children }: IProps): JSX.Element => {
  const disabled = useIsDisabledItem()
  const item = store.getState().items[index]

  return (
    <ItemLayout
      index={index}
      i={index}
      disabled={disabled}
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
      <Msg index={index} />
      <PasteHere index={index}>
        {children}
      </PasteHere>
    </ItemLayout>
  )
}
