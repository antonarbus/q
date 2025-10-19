import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { cellKey } from '@entities/quotation/const/cellKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entities/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getRowCellHtmlFromStore } from '@entities/quotation/redux/getter/getRowCellHtmlFromStore'
import { cellStyle } from '@entities/quotation/style/cellStyle'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { updateDescriptionCell } from '@features/blocks/cell/update-cell/row-block-cells/description/updateDescriptionCell'
import { beforeUpload } from '@features/file/upload-file'
import type { JSX } from 'react'

export const DescriptionCell = (): JSX.Element => {
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: boqColumnKey.description,
    minWidth: columnMinWidth.description,
  })

  return (
    <Froala
      beforeUpload={beforeUpload}
      className={`td ${cellKey.description}`}
      editorRef={row.descriptionEditorRef}
      htmlGetter={() =>
        getRowCellHtmlFromStore({ cellKey: cellKey.description })
      }
      onContentChange={() => {
        updateDescriptionCell({
          editorRef: row.descriptionEditorRef,
        })
      }}
      placeholder='Description...'
      style={{
        ...cellStyle,
        textAlign: 'left',
      }}
      sx={{
        '.fr-placeholder': { left: 0 },
      }}
      wrapperStyles={stylesForResizableCell}
    />
  )
}
