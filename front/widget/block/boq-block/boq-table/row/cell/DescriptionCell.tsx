import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getHtmlOfCellFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfCellFromStoreByIndex'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { updateDescriptionCellAtBoqBlock } from '@feature/blocks/update-description-cell-at-boq-block/updateDescriptionCellAtBoqBlock'
import { focusItemPriceCellAtBoqBlock } from '@feature/blocks/focus-item-price-cell-at-boq-block/focusItemPriceCellAtBoqBlock'
import { upload } from '@feature/file/upload-file'
import { TextEditor } from '@shared/component/TextEditor'
import { getRegistryKey } from '@shared/lib/tiptap/editorRegistry'

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

        // todo: move event.preventDefault() inside
        focusItemPriceCellAtBoqBlock({
          blockIndex: block.index,
          rowIndex: row.index,
        })

        return true
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
