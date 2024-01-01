import { Box } from '@mui/material'
import { dispatch, theme } from 'client/shared/clients'
import { boqCellHtmlGetter, selectColumnWidth } from 'client/entities/items'
import { isBoqRowPriceValid, updateBoqRowCellAtStore, updateSubTotalPriceCell } from 'client/features/update_text'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { Froala } from 'client/shared/ui/froala'
import { useBoqItem } from 'client/widgets/items/boq/BoqItemProvider'
import { useItem } from 'client/widgets/items/ItemProvider'
import { useRow } from '../../RowProvider'
import { dialogSlice } from 'client/shared/components/dialog/dialogSlice'
import { PriceWasChangedManuallyDialog } from './PriceWasChangedManuallyDialog'

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
        onBlur={() => {
          if (!isBoqRowPriceValid({ itemIndex, rowIndex })) {
            dispatch(dialogSlice.actions.showPriceWasChangedManuallyDialog({
              itemIndex,
              rowIndex,
            }))
          }
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
      <PriceWasChangedManuallyDialog />
    </Box>
  )
}
