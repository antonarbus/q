import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import type { KeyboardEvent } from 'react'

type Props = {
  event: KeyboardEvent
  itemPriceCellEditorRef: FroalaEditorRef
  rowIndex: number
}

export const tabFromDescriptionCell = (props: Props): void => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    props.event.preventDefault()
    props.itemPriceCellEditorRef.current?.commands.selectAll()
  }
}
