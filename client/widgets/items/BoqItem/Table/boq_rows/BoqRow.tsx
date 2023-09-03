import { Box } from '@mui/material'
import { selectColumnWidth } from 'client/entities/items'
import { DragIcon } from 'client/features/drag_item'
import { useSelectorTyped } from 'client/shared/hooks'
import type { BoqRow as BoqRowType } from 'client/shared/types'

interface Props {
  index: number
  rowIndex: number
  boqRow: BoqRowType
}

export const BoqRow = ({ boqRow, index, rowIndex }: Props): JSX.Element => {
  const numberColWidth = useSelectorTyped(selectColumnWidth({ index, headerName: 'number' }))
  const isNumberColWidthSetManually = numberColWidth !== undefined
  const descriptionColWidth = useSelectorTyped(selectColumnWidth({ index, headerName: 'description' }))
  const isDescriptionColWidthSetManually = descriptionColWidth !== undefined
  const itemColWidth = useSelectorTyped(selectColumnWidth({ index, headerName: 'item' }))
  const isItemColWidthSetManually = itemColWidth !== undefined
  const qtyColWidth = useSelectorTyped(selectColumnWidth({ index, headerName: 'qty' }))
  const isQtyColWidthSetManually = qtyColWidth !== undefined
  const priceColWidth = useSelectorTyped(selectColumnWidth({ index, headerName: 'price' }))
  const isPriceColWidthSetManually = priceColWidth !== undefined

  return (
    <Box
      className='tr'
      sx={{
        display: 'flex',
        minHeight: '50px',
        alignItems: 'flex-end',
        position: 'relative',
      }}
    >
      <Box
        className='td icons'
        sx={{
          position: 'absolute',
          top: 0,
          height: 0,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            background: 'yellow',
            scale: '0.5',
          }}
        >
          <DragIcon />
        </Box>
      </Box>
      <Box
        className='td number'
        sx={{
          display: isNumberColWidthSetManually ? 'block' : 'flex',
          flexShrink: 0,
          width: isNumberColWidthSetManually ? numberColWidth : 'auto',
          maxWidth: isNumberColWidthSetManually ? numberColWidth : 'auto',
          minWidth: '30px',
        }}
      >
        {boqRow.number.html}
      </Box>
      <Box
        className='td description'
        sx={{
          display: isDescriptionColWidthSetManually ? 'block' : 'flex',
          flexGrow: isDescriptionColWidthSetManually ? 0 : 1,
          flexShrink: 0,
          width: isDescriptionColWidthSetManually ? descriptionColWidth : 'auto',
          maxWidth: isDescriptionColWidthSetManually ? descriptionColWidth : 'auto',
          minWidth: '200px',
        }}
      >
        {boqRow.description.html}
      </Box>
      <Box
        className='td item'
        sx={{
          display: isItemColWidthSetManually ? 'block' : 'flex',
          flexShrink: 0,
          width: isItemColWidthSetManually ? itemColWidth : 'auto',
          maxWidth: isItemColWidthSetManually ? itemColWidth : 'auto',
          minWidth: '100px',
        }}
      >
        {boqRow.item.html}
      </Box>
      <Box
        className='td qty'
        sx={{
          display: isQtyColWidthSetManually ? 'block' : 'flex',
          flexShrink: 0,
          width: isQtyColWidthSetManually ? qtyColWidth : 'auto',
          maxWidth: isQtyColWidthSetManually ? qtyColWidth : 'auto',
          minWidth: '100px',
        }}
      >
        {boqRow.qty.html}
      </Box>
      <Box
        className='td price'
        sx={{
          display: isPriceColWidthSetManually ? 'block' : 'flex',
          flexShrink: 0,
          width: isPriceColWidthSetManually ? priceColWidth : 'auto',
          maxWidth: isPriceColWidthSetManually ? priceColWidth : 'auto',
          minWidth: '100px',
        }}
      >
        {boqRow.price.html}
      </Box>
    </Box>
  )
}
