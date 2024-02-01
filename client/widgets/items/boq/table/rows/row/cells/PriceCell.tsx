import { Box } from '@mui/material'
import { Pin, pinBoqRowPriceCell, showBoqRowPins } from '@features/pin'
import { formatBoqRowPriceCell, updateBoqRowPriceCell, validateBoqRowPrice } from '@features/update_cell'
import { getBoqCellHtmlFromStore, useBoqItem, useItem, useRow, Froala, boqRowCellStyle, useStylesForResizableCell } from '@entities/items'
import type { BoqRowCellKey } from '@entities/items'

const boqRowCellKey: BoqRowCellKey = 'price'

export const PriceCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { rowIndex, priceCellEditorRef, qtyCellEditorRef, itemPriceCellEditorRef } = useRow()
  const { subTotalPriceEditorRef, boqRowEditorRefs } = useBoqItem()
  const { stylesForResizableCell } = useStylesForResizableCell({ itemIndex, boqColumnKey: boqRowCellKey, minWidth: '100px' })

  return (
    <Box sx={{ display: 'flex', position: 'relative' }} >
      <Froala
        className={`td ${boqRowCellKey}`}
        editorRef={priceCellEditorRef}
        placeholder='Price...'
        htmlGetter={() => getBoqCellHtmlFromStore({ itemIndex, rowIndex, boqRowCellKey })}
        onFocus={() => {
          showBoqRowPins({ itemIndex, rowIndex })
        }}
        onContentChange={() => {
          updateBoqRowPriceCell({ boqRowCellKey, itemIndex, itemPriceCellEditorRef, priceCellEditorRef, qtyCellEditorRef, rowIndex, subTotalPriceEditorRef })
        }}
        onBlur={() => {
          formatBoqRowPriceCell({ rowIndex, priceCellEditorRef, itemIndex })
          validateBoqRowPrice({ itemIndex, priceCellEditorRef, rowIndex, subTotalPriceEditorRef })
        }}
        onKeydown={(e) => {
          const isTabKey = e.key === 'Tab'
          if (isTabKey) {
            const isLastRow = boqRowEditorRefs.length === rowIndex + 1
            if (isLastRow) {
              // just use default tabbing to the next focusable area
            }
            if (!isLastRow) {
              e.preventDefault()
              boqRowEditorRefs.at(rowIndex + 1)?.description.current?.commands.selectAll()
            }
          }
        }}
        wrapperStyles={stylesForResizableCell}
        additionalStyle={boqRowCellStyle}
      />
      <Pin
        boqRowCellKey={boqRowCellKey}
        onClick={() => {
          pinBoqRowPriceCell({ itemIndex, rowIndex })
        }}
      />
    </Box>
  )
}
