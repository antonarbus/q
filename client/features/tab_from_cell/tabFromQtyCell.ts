import { type FroalaEditorRef } from '@shared/types'

type Props = {
  e: KeyboardEvent
  priceCellEditorRef: FroalaEditorRef
  rowIndex: number
}

export const tabFromQtyCell = ({
  e,
  priceCellEditorRef,
}: Props): void => {
  const isTabKey = e.key === 'Tab'

  if (isTabKey) {
    e.preventDefault()
    priceCellEditorRef.current?.commands.selectAll()
  }
}
