import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button } from '@mui/material'
import { useSelectorTyped } from 'client/shared/hooks'
import { useItem } from 'client/widgets/items/ItemProvider'
import { type ReactNode } from 'react'
import { useRow } from '../../RowProvider'
import { dialogSlice } from 'client/shared/components/dialog/dialogSlice'
import { dispatch } from 'client/shared/clients'

export const PriceWasChangedManuallyDialog = (): ReactNode => {
  const { itemIndex, rowIndex } = useSelectorTyped(state => state.dialog.priceWasChangedManually)
  const { itemIndex: thisItemIndex } = useItem()
  const {
    rowIndex: thisRowIndex,
    priceCellEditorRef,
    qtyCellEditorRef,
    itemPriceCellEditorRef,
  } = useRow()

  const isOpen = itemIndex === thisItemIndex && rowIndex === thisRowIndex

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} >
      <DialogTitle>
        Price was changed manually
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          What cell should be recalculated to match the new price?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            console.log('re-calc item price')
            console.log({ itemIndex, rowIndex })
            dispatch(dialogSlice.actions.hidePriceWasChangedManuallyDialog())
          }}
        >
          Item price
        </Button>
        <Button
          onClick={() => {
            console.log('re-calc qty')
            console.log({ itemIndex, rowIndex })
            dispatch(dialogSlice.actions.hidePriceWasChangedManuallyDialog())
          }}
        >
          Qty
        </Button>
      </DialogActions>
    </Dialog>
  )
}
