import { dispatch } from '@lib_instances/store'
import { boqRowCellKey, formatBoqRowCellNumber } from '@entities/items'
import { navSlice } from '@shared/nav'
import { type FroalaEditorRef } from '@shared/types'

type Props = {
  qtyCellEditorRef: FroalaEditorRef
  itemIndex: number
  rowIndex: number
}

export const formatBoqRowQtyCell = ({
  qtyCellEditorRef,
  itemIndex,
  rowIndex,
}: Props): void => {
  const { didUpdate } = formatBoqRowCellNumber({
    itemIndex,
    rowIndex,
    boqRowCellKey: boqRowCellKey.qty,
    editorRef: qtyCellEditorRef,
    roundToTwoDecimals: false,
  })

  if (didUpdate) {
    dispatch(navSlice.actions.enableTopNavItem({ navMenuItemIdKey: 'save' }))
  }
}
