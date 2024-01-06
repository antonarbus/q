import { Box } from '@mui/material'
import { theme } from 'client/shared/clients'
import { boqCellHtmlGetter, selectColumnWidth, useItem, useRow, useBoqItem, Froala, Pin } from 'client/entities/items'
import { formatBoqRowCellNumber, updateBoqRowCellAtStore, updateBoqRowPriceCell, updateSubTotalPriceCell } from 'client/features/update_text'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'

const boqColumnKey: BoqColumnKey = 'qty'

export const QtyCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()
  const { rowIndex, qtyCellEditorRef, priceCellEditorRef } = useRow()
  const qtyColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isQtyColWidthSetManually = qtyColWidth !== undefined
  const width = isQtyColWidthSetManually ? qtyColWidth : 'auto'
  const minWidth = '100px'
  const maxWidth = width === 'auto' ? minWidth : width

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isQtyColWidthSetManually ? 'block' : 'flex',
        position: 'relative',
        flexGrow: 0,
        flexShrink: 0,
        width,
        maxWidth,
        minWidth,
      }}
    >
      <Froala
        editorRef={qtyCellEditorRef}
        placeholder='Qty...'
        htmlGetter={() => boqCellHtmlGetter({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          if (qtyCellEditorRef.current === null) return

          updateBoqRowCellAtStore({
            itemIndex,
            rowIndex,
            boqColumnKey,
            html: qtyCellEditorRef.current.html.get(),
          })

          updateBoqRowPriceCell({
            itemIndex,
            rowIndex,
            priceCellEditor: priceCellEditorRef.current,
          })

          updateSubTotalPriceCell({
            itemIndex,
            subTotalPriceEditor: subTotalPriceEditorRef.current,
          })
        }}
        onBlur={() => {
          formatBoqRowCellNumber({
            itemIndex,
            rowIndex,
            boqColumnKey,
            cellEditor: qtyCellEditorRef.current,
            roundToTwoDecimals: false,
          })
        }}
        additionalStyle={{
          textAlign: 'center',
          padding: theme.cell.padding,
          '.fr-placeholder': {
            left: '15px',
          },
          minHeight: '44px', // otherwise placeholder is misplaced on init
          '.fr-wrapper': {
            minHeight: '24px', // otherwise placeholder is misplaced on init
          },
        }}
      />
      <Pin boqColumnKey={boqColumnKey} />
    </Box>
  )
}
