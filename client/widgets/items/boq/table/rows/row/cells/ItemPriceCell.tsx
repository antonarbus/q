import { Box } from '@mui/material'
import { theme } from 'client/shared/clients'
import { boqCellHtmlGetter, selectColumnWidth } from 'client/entities/items'
import { roundBoqCell, updateBoqCell, updatePriceCell, updateSubTotalPrice } from 'client/features/update_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { Froala } from 'client/shared/ui/froala'
import { useItem } from 'client/widgets/items/ItemProvider'
import { useRow } from '../../RowProvider'
import { useBoqItem } from 'client/widgets/items/boq/BoqItemProvider'

const boqColumnKey: BoqColumnKey = 'itemPrice'

export const ItemPriceCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()
  const { rowIndex, itemPriceCellEditorRef, priceCellEditorRef } = useRow()
  const itemColWidth = useSelectorTyped(selectColumnWidth({ itemIndex, boqColumnKey }))
  const isItemColWidthSetManually = itemColWidth !== undefined
  const width = isItemColWidthSetManually ? itemColWidth : 'auto'
  const minWidth = '100px'
  const maxWidth = width === 'auto' ? minWidth : width

  return (
    <Box
      className={`td ${boqColumnKey}`}
      sx={{
        display: isItemColWidthSetManually ? 'block' : 'flex',
        flexGrow: 0,
        flexShrink: 0,
        width,
        maxWidth,
        minWidth,
      }}
    >
      <Froala
        editorRef={itemPriceCellEditorRef}
        placeholder={`${boqColumnKey}...`}
        htmlGetter={() => boqCellHtmlGetter({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          if (itemPriceCellEditorRef.current === null) return
          updateBoqCell({ itemIndex, rowIndex, boqColumnKey, html: itemPriceCellEditorRef.current.html.get() })
          updatePriceCell({ itemIndex, rowIndex, priceCellEditor: priceCellEditorRef.current })
          updateSubTotalPrice({ itemIndex, subTotalPriceEditor: subTotalPriceEditorRef.current })
        }}
        onBlur={() => {
          roundBoqCell({ itemIndex, rowIndex, boqColumnKey, cellEditor: itemPriceCellEditorRef.current })
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
