import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import type { KeyboardEvent } from 'react'

type Props = {
  event: KeyboardEvent
  qtyCellEditorRef: FroalaEditorRef
  rowIndex: number
}

export const tabFromItemPriceCell = (props: Props): void => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    props.event.preventDefault()
    props.qtyCellEditorRef.current?.commands.selectAll()
  }
}
