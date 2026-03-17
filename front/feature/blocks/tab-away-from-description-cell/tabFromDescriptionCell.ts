import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = {
  event: KeyboardEvent
  blockIndex: number
  rowIndex: number
}

export const tabFromDescriptionCell = (props: Props): boolean => {
  const isTabKey = props.event.key === 'Tab'

  if (isTabKey === true) {
    props.event.preventDefault()

    editorRegistry
      .get(
        getRegistryKey({
          editorName: 'boqBlockItemPriceCell',
          blockIndex: props.blockIndex,
          rowIndex: props.rowIndex,
        }),
      )
      ?.chain()
      .focus()
      .selectAll()
      .run()

    return true
  }

  return false
}
