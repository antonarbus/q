import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  e: React.KeyboardEvent
  priceCellEditorRef: FroalaEditorRef
  rowIndex: number
}

export const tabFromQtyCell = (props: Props): void => {
  const isTabKey = props.e.key === 'Tab'

  if (isTabKey) {
    props.e.preventDefault()
    props.priceCellEditorRef.current?.commands.selectAll()
  }
}
