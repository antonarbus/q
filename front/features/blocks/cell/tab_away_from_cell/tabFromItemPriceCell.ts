import type { FroalaEditorRef } from '@shared/types/froala'

type Props = {
  e: React.KeyboardEvent
  qtyCellEditorRef: FroalaEditorRef
  rowIndex: number
}

export const tabFromItemPriceCell = (props: Props): void => {
  const isTabKey = props.e.key === 'Tab'

  if (isTabKey === true) {
    props.e.preventDefault()
    props.qtyCellEditorRef.current?.commands.selectAll()
  }
}
