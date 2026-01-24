import type { EditorRef } from '@shared/lib/tiptap/types'
import type { KeyboardEvent } from 'react'

type Props = {
  event: KeyboardEvent
  qtyCellEditorRef: EditorRef
  rowIndex: number
}

export const tabFromItemPriceCell = (props: Props): void => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    props.event.preventDefault()
    props.qtyCellEditorRef.current?.commands.selectAll()
  }
}
