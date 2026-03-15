import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  event: KeyboardEvent
  itemPriceCellEditorRef: EditorRef
  rowIndex: number
}

export const tabFromDescriptionCell = (props: Props): boolean => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    props.event.preventDefault()
    props.itemPriceCellEditorRef.current?.chain().focus().selectAll().run()

    return true
  }

  return false
}
