import { Box } from '@mui/material'
import { theme } from 'client/shared/clients'
import { boqCellHtmlGetter, selectColumnWidth } from 'client/entities/items'
import { updateBoqCell, updatePriceCell, updateSubTotalPrice } from 'client/features/update_cell'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqColumnKey } from 'client/shared/types'
import { Froala } from 'client/shared/ui/froala'
import { useItem } from 'client/widgets/items/ItemProvider'
import { useRow } from '../../RowProvider'
import { useBoqItem } from 'client/widgets/items/boq/BoqItemProvider'

const boqColumnKey: BoqColumnKey = 'itemPrice'

export const ItemPriceCell = (): JSX.Element => {
  const { itemIndex } = useItem()
  const { subTotalEditorRef } = useBoqItem()
  const { rowIndex, itemCellEditorRef, priceCellEditorRef } = useRow()
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
        editorRef={itemCellEditorRef}
        placeholder={`${boqColumnKey}...`}
        htmlGetter={() => boqCellHtmlGetter({ itemIndex, rowIndex, boqColumnKey })}
        onContentChange={() => {
          if (itemCellEditorRef.current === null) return
          const html = itemCellEditorRef.current.html.get()
          updateBoqCell({ itemIndex, rowIndex, boqColumnKey, html })

          const priceCellEditor = priceCellEditorRef.current
          updatePriceCell({ itemIndex, rowIndex, priceCellEditor })

          const subTotalEditor = subTotalEditorRef.current
          updateSubTotalPrice({ itemIndex, subTotalEditor })
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
