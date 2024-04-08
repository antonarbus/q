import { dispatch } from '@lib_instances/store'
import { boqRowCellKey, formatBoqRowCellNumber } from '@entities/items'
import { navMenuItemId } from '@shared/consts/navMenuItemId'
import { navSlice } from '@shared/nav'
import { type FroalaEditorRef } from '@shared/types'

type Props = {
  priceCellEditorRef: FroalaEditorRef
  itemIndex: number
  rowIndex: number
}

export const formatBoqRowPriceCell = ({
  priceCellEditorRef,
  itemIndex,
  rowIndex,
}: Props): void => {
  const { didUpdate } = formatBoqRowCellNumber({
    itemIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.price,
    editorRef: priceCellEditorRef,
    roundToTwoDecimals: true,
  })

  if (didUpdate) {
    dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: navMenuItemId.save }))
  }
}
