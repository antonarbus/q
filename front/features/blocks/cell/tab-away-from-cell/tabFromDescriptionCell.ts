import type { FroalaEditorRef } from '@shared/type/froala'
import type { KeyboardEvent } from 'react'

type Props = {
  event: KeyboardEvent
  itemPriceCellEditorRef: FroalaEditorRef
  rowIndex: number
}

export const tabFromDescriptionCell = ({
  event,
  itemPriceCellEditorRef,
}: Props): void => {
  const isTabKey = event.key === 'Tab'

  if (isTabKey === true) {
    event.preventDefault()
    itemPriceCellEditorRef.current?.commands.selectAll()
  }
}
