import { BOOKMARK_POS_AT_BLOCKS } from '@entities/quotation/const/bookmarkPosAtBlocks'
import { boqColumnKey } from '@entities/quotation/const/boqColumnKey'
import { boqRowCellKey } from '@entities/quotation/const/boqRowCellKey'
import { columnMinWidth } from '@entities/quotation/const/columnMinWidth'
import { useStylesForResizableCell } from '@entities/quotation/hook/useStylesForResizableCell'
import { useRow } from '@entities/quotation/provider/RowProvider'
import { getRowCellHtmlFromStore } from '@entities/quotation/redux/getter/getRowCellHtmlFromStore'
import {
  boqRowCellStyle,
  boqRowCellSx,
} from '@entities/quotation/style/boqRowCellStyle'
import { Froala } from '@entities/quotation/ui/froala/Froala'
import { formatQtyCell } from '@features/blocks/cell/update-cell/row-block-cells/qty/formatQtyCell'
import { updateQtyCell } from '@features/blocks/cell/update-cell/row-block-cells/qty/updateQtyCell'
import { Box } from '@mui/material'
import type { JSX } from 'react'

export const QtyCell = (): JSX.Element => {
  const row = useRow()

  const stylesForResizableCell = useStylesForResizableCell({
    blockIndex: BOOKMARK_POS_AT_BLOCKS,
    boqColumnKey: boqColumnKey.qty,
    minWidth: columnMinWidth.qty,
  })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Froala
        className={`td ${boqRowCellKey.qty}`}
        editorRef={row.qtyCellEditorRef}
        htmlGetter={() =>
          getRowCellHtmlFromStore({ boqRowCellKey: boqRowCellKey.qty })
        }
        onBlur={() => {
          formatQtyCell({ qtyCellEditorRef: row.qtyCellEditorRef })
        }}
        onContentChange={() => {
          updateQtyCell({
            priceCellEditorRef: row.priceCellEditorRef,
            qtyCellEditorRef: row.qtyCellEditorRef,
          })
        }}
        placeholder='Qty...'
        style={boqRowCellStyle}
        sx={boqRowCellSx}
        wrapperStyles={stylesForResizableCell}
      />
    </Box>
  )
}
