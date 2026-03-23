import { columnMinWidth } from '@front/entities/quotation/ui/columnMinWidth'
import { useStylesForResizableCell } from '@front/entities/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@front/entities/quotation/provider/BlockProvider'
import { useRow } from '@front/entities/quotation/provider/RowProvider'
import { getHtmlOfCellFromStoreByIndex } from '@front/entities/quotation/redux/getter/getHtmlOfCellFromStoreByIndex'
import { cellStyle } from '@front/entities/quotation/style/cellStyle'
import { updateDescriptionCellAtBoqBlock } from '@front/features/blocks/update-description-cell-at-boq-block/updateDescriptionCellAtBoqBlock'
import { focusItemPriceCellAtBoqBlock } from '@front/features/blocks/focus-item-price-cell-at-boq-block/focusItemPriceCellAtBoqBlock'
import { upload } from '@front/features/file/upload-file'
import { TextEditor } from '@front/shared/component/TextEditor'
import { getRegistryKey } from '@front/shared/lib/tiptap/editorRegistry'

export const DescriptionCell = (): React.JSX.Element => {
  const block = useBlock()
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: block.index,
    boqColumnKey: 'description',
    minWidth: `${columnMinWidth.description}px`,
  })

  return (
    <TextEditor
      registryKey={getRegistryKey({
        editorName: 'boqBlockDescriptionCell',
        blockIndex: block.index,
        rowIndex: row.index,
      })}
      className='td description'
      placeholder='Description...'
      contentGetter={() =>
        getHtmlOfCellFromStoreByIndex({
          blockIndex: block.index,
          cellKey: 'description',
          rowIndex: row.index,
        })
      }
      onChange={() => {
        updateDescriptionCellAtBoqBlock({
          blockIndex: block.index,
          cellKey: 'description',
          rowIndex: row.index,
        })
      }}
      onKeyDown={(_view, event) => {
        if (event.key !== 'Tab') {
          return false
        }

        event.preventDefault()

        focusItemPriceCellAtBoqBlock({
          blockIndex: block.index,
          rowIndex: row.index,
        })

        return true // stop ProseMirror propagation
      }}
      onUpload={upload}
      sx={{
        ...stylesForResizableCell,
        ...cellStyle,
        textAlign: 'left',
      }}
    />
  )
}
