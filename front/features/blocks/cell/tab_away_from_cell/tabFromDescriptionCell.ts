import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  e: React.KeyboardEvent
  itemPriceCellEditorRef: FroalaEditorRef
  rowIndex: number
}

export const tabFromDescriptionCell = ({
  e,
  itemPriceCellEditorRef,
}: Props): void => {
  const isTabKey = e.key === 'Tab'

  if (isTabKey === true) {
    e.preventDefault()
    itemPriceCellEditorRef.current?.commands.selectAll()
  }
}
