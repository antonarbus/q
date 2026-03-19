import { columnMinWidth } from '@entity/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entity/quotation/hook/useStylesForResizableCell'
import { useBlock } from '@entity/quotation/provider/BlockProvider'
import { useRow } from '@entity/quotation/provider/RowProvider'
import { getHtmlOfCellFromStoreByIndex } from '@entity/quotation/redux/getter/getHtmlOfCellFromStoreByIndex'
import { cellStyle } from '@entity/quotation/style/cellStyle'
import { onChangeDescriptionCellAtBoqBlock } from '@feature/blocks/on-text-change/on-change-description-cell-at-boq-block/onChangeDescriptionCellAtBoqBlock'
import { onTabAwayFromDescriptionCell } from '@feature/blocks/on-cell-tab-away/on-tab-away-from-description-cell/onTabAwayFromDescriptionCell'
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
      onUpdate={() => {
        onChangeDescriptionCellAtBoqBlock({
          blockIndex: block.index,
          cellKey: 'description',
          rowIndex: row.index,
        })
      }}
      onKeyDown={(_view, event) =>
        onTabAwayFromDescriptionCell({
          event,
          blockIndex: block.index,
          rowIndex: row.index,
        })
      }
      onUpload={upload}
      sx={{
        ...stylesForResizableCell,
        ...cellStyle,
        textAlign: 'left',
      }}
    />
  )
}
