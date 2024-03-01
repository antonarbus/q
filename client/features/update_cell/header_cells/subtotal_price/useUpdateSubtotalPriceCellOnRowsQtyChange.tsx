import { useSelectorTyped } from '@lib_instances/store'
import { useUpdateEffect } from 'react-use'
import { roundTo } from 'round-to'
import { useBoqItem, useItem, getBoqRowsFromStore, type BoqRow, updateSubTotalPriceWithValue, saveItemsLocally } from '@entities/items'
import { markAsNotSaved } from '@shared/isSaved'

export const useUpdateSubtotalPriceCellOnRowsQtyChange = (): void => {
  const { itemIndex } = useItem()
  const { subTotalPriceEditorRef } = useBoqItem()

  const isFroala = useSelectorTyped(state => state.general.isFroala)
  const isItemFroala = useSelectorTyped(state => state.items[itemIndex]?.isFroala)

  useUpdateEffect(() => {
    if (!isFroala) return
    if (!isItemFroala) return

    const boqRows = getBoqRowsFromStore({ itemIndex })

    if (boqRows === undefined) return

    const subTotalPriceValueNew: number = boqRows.reduce((accumulator: number, boqRow: BoqRow) => {
      const price = boqRow.price.value
      return accumulator + price
    }, 0)

    const subTotalPriceValueNewRounded = roundTo(subTotalPriceValueNew, 2)

    const { didChange } = updateSubTotalPriceWithValue({
      itemIndex,
      subTotalPriceEditor: subTotalPriceEditorRef.current,
      value: subTotalPriceValueNewRounded,
      incrementally: true,
    })

    if (!didChange) return

    saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
    markAsNotSaved()
  }, [isItemFroala, isFroala])
}
