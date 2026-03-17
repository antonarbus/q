import { getRowsFromStore } from '@entity/quotation/redux/getter/getRowsFromStore'
import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = {
  event: KeyboardEvent
  blockIndex: number
  rowIndex: number
}

export const tabFromPriceCell = (props: Props): boolean => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    const rows = getRowsFromStore({ blockIndex: props.blockIndex })
    const rowCount = rows?.length ?? 0
    const isLastRow = rowCount === props.rowIndex + 1

    if (isLastRow === true) {
      return false
    }

    if (isLastRow === false) {
      props.event.preventDefault()

      editorRegistry
        .get(
          getRegistryKey({
            editorName: 'boqBlockDescriptionCell',
            blockIndex: props.blockIndex,
            rowIndex: props.rowIndex + 1,
          }),
        )
        ?.chain()
        .focus()
        .selectAll()
        .run()

      return true
    }

    return false
  }

  return false
}
