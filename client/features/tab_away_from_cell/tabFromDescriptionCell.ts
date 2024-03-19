import { type FroalaEditorRef } from '@shared/types'

type Props = {
  e: KeyboardEvent
  itemPriceCellEditorRef: FroalaEditorRef
  rowIndex: number
}

export const tabFromDescriptionCell = ({
  e,
  itemPriceCellEditorRef,
}: Props): void => {
  const isTabKey = e.key === 'Tab'

  if (isTabKey) {
    e.preventDefault()
    itemPriceCellEditorRef.current?.commands.selectAll()
  }
}
