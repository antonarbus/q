import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  e: KeyboardEvent
  qtyCellEditorRef: FroalaEditorRef
  rowIndex: number
}

export const tabFromItemPriceCell = ({ e, qtyCellEditorRef }: Props): void => {
  const isTabKey = e.key === 'Tab'

  if (isTabKey) {
    e.preventDefault()
    qtyCellEditorRef.current?.commands.selectAll()
  }
}
