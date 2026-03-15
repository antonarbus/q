import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  event: KeyboardEvent
  qtyCellEditorRef: EditorRef
  rowIndex: number
}

export const tabFromItemPriceCell = (props: Props): boolean => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    props.event.preventDefault()
    props.qtyCellEditorRef.current?.chain().focus().selectAll().run()

    return true
  }

  return false
}
