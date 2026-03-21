import { getRowsFromStoreByIndex } from '@entity/quotation/redux/getter/getRowsFromStoreByIndex'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const focusNextRowDescriptionCellAtBoqBlock = (
  props: Props,
): boolean => {
  const rows = getRowsFromStoreByIndex({ blockIndex: props.blockIndex })
  const rowCount = rows?.length ?? 0
  const isLastRow = rowCount === props.rowIndex + 1

  if (isLastRow === true) {
    return false
  }

  const NEXT_ROW_INDEX = props.rowIndex + 1

  editorRegistry
    .get(
      getRegistryKey({
        editorName: 'boqBlockDescriptionCell',
        blockIndex: props.blockIndex,
        rowIndex: NEXT_ROW_INDEX,
      }),
    )
    ?.chain()
    .focus()
    .selectAll()
    .run()

  return true
}
