import {
  editorRegistry,
  getRegistryKey,
} from '@front/shared/lib/tiptap/editorRegistry'

type Props = {
  blockIndex: number
  rowIndex: number
}

export const focusItemPriceCellAtBoqBlock = (props: Props): void => {
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
}
