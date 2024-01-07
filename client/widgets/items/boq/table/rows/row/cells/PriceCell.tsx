import { Box } from '@mui/material'
import { dispatch, theme } from 'client/shared/clients'
import { boqCellHtmlGetter, selectColumnWidth, useBoqItem, useItem, useRow, Froala, itemsSlice } from 'client/entities/items'
import { isBoqRowPriceValid, updateBoqRowCellAtStore, updateSubTotalPriceCell } from 'client/features/update_text'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { showBoqRowPins } from 'client/features/pin'

const boqColumnKey: BoqColumnKey = 'price'

export const PriceCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { rowIndex, priceCellEditorRef } = useRow()
  const { subTotalPriceEditorRef } = useBoqItem()
  const priceColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isPriceColWidthSetManually = priceColWidth !== undefined
  const width = isPriceColWidthSetManually ? priceColWidth : 'auto'
  const minWidth = '100px'
  const maxWidth = width === 'auto' ? minWidth : width

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isPriceColWidthSetManually ? 'block' : 'flex',
        position: 'relative',
        flexGrow: 0,
        flexShrink: 0,
        width,
        maxWidth,
        minWidth,
      }}
    >
      <Froala
        editorRef={priceCellEditorRef}
        placeholder='Price...'
        htmlGetter={() => boqCellHtmlGetter({ itemIndex, rowIndex, boqColumnKey })}
        onFocus={() => {
          showBoqRowPins({ itemIndex, rowIndex })
        }}
        onContentChange={() => {
          if (priceCellEditorRef.current === null) return

          updateBoqRowCellAtStore({
            itemIndex,
            rowIndex,
            boqColumnKey,
            html: priceCellEditorRef.current.html.get(),
          })

          updateSubTotalPriceCell({
            itemIndex,
            subTotalPriceEditor: subTotalPriceEditorRef.current,
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
    </Box>
  )
}
