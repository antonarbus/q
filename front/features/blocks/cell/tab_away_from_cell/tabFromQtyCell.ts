import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  event: React.KeyboardEvent
  priceCellEditorRef: FroalaEditorRef
  rowIndex: number
}

export const tabFromQtyCell = (props: Props): void => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    props.event.preventDefault()
    props.priceCellEditorRef.current?.commands.selectAll()
  }
}
