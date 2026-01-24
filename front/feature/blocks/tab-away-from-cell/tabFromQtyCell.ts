import type { EditorRef } from '@shared/lib/tiptap/types'
import type { KeyboardEvent } from 'react'

type Props = {
  event: KeyboardEvent
  priceCellEditorRef: EditorRef
  rowIndex: number
}

export const tabFromQtyCell = (props: Props): void => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    props.event.preventDefault()
    props.priceCellEditorRef.current?.commands.selectAll()
  }
}
