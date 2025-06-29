import type { FroalaEditorRef } from '@shared/type/froala'

type Props = {
  event: React.KeyboardEvent
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
