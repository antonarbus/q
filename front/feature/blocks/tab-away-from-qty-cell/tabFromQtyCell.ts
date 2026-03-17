import { editorRegistry } from '@shared/lib/tiptap/editorRegistry'

type Props = {
  event: KeyboardEvent
  blockIndex: number
  rowIndex: number
}

export const tabFromQtyCell = (props: Props): boolean => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    props.event.preventDefault()

    editorRegistry
      .get({
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
        cellKey: 'priceCell',
      })
      ?.chain()
      .focus()
      .selectAll()
      .run()

    return true
  }

  return false
}
