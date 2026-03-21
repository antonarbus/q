import {
  editorRegistry,
  getRegistryKey,
} from '@shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const focusQtyCellAtBoqBlock = (props: Props): void => {
  editorRegistry
    .get(
      getRegistryKey({
        editorName: 'boqBlockQtyCell',
        blockIndex: props.blockIndex,
        rowIndex: props.rowIndex,
      }),
    )
    ?.chain()
    .focus()
    .selectAll()
    .run()
}
