import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'
import { rowEditorKey } from '@shared/lib/tiptap/editorKey'

type Props = {
  event: KeyboardEvent
  blockIndex: number
  rowIndex: number
}

export const tabFromQtyCell = (props: Props): boolean => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    props.event.preventDefault()

    editorRegistry
      .get(
        rowEditorKey({
          blockIndex: props.blockIndex,
          rowIndex: props.rowIndex,
          cellKey: 'price',
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
