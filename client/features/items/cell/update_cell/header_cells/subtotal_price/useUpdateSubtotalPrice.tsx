import { dispatch, useSelectorTyped } from '@lib_instances/store'
import { useUpdateEffect } from 'react-use'
import { roundTo } from 'round-to'
import {
  useBoqItem,
  useItem,
  getBoqRowsFromStore,
  type BoqRow,
  updateSubTotalPriceWithValue,
  isFroalaSignal,
} from '@entities/quotation'
import { navItemId } from '@shared/consts/navItemId'
import { navSlice } from '@shared/nav'

export const useUpdateSubtotalPrice = (): void => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()
  const isItemFroala = useSelectorTyped(
    (state) => state.quotation.items[itemIndex]?.isFroala,
  )

  useUpdateEffect(() => {
    if (!isFroalaSignal.value) return
    if (!isItemFroala) return

    const boqRows = getBoqRowsFromStore({ itemIndex })

    if (boqRows === undefined) return

    const subTotalPriceValueNew: number = boqRows.reduce(
      (accumulator: number, boqRow: BoqRow) => {
        const price = boqRow.price.value
        return accumulator + price
      },
      0,
    )

    const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

    setTimeout(() => {
      const { didChange } = updateSubTotalPriceWithValue({
        itemIndex,
        subTotalPriceEditor: subTotalPriceEditorRef.current,
        value: subTotalPriceValueNewRounded,
        incrementally: true,
      })

      if (!didChange) return

      dispatch(
        navSlice.actions.enableNavItems({ navItemIdKeys: [navItemId.save] }),
      )
    })
  }, [isItemFroala, isFroalaSignal.value])
}
