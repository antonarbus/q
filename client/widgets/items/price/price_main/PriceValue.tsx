import { dispatch, getState, useSelectorTyped } from '@lib_instances/store'
import { useRef } from 'react'
import { useUpdateEffect } from 'react-use'
import { useItem, Froala, itemType, saveItemsLocally, itemsSlice, type BoqItem } from '@entities/items'
import { type Item } from '@entities/items/types'
import { getNumberFromString, getStringWithNewFormattedNumber, getTextContentFromHtml, updateNumberAtHtmlIncrementally } from '@shared/lib'
import { type FroalaEditorRef, type FroalaEditor } from '@shared/types'

export const PriceValue = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  const price = useSelectorTyped(state => {
    const price = getTotalPriceAbove({ itemIndex, items: state.items })
    return price
  })

  useUpdateEffect(() => {
    if (editorRef.current === null) return

    const priceItem = getState().items[itemIndex]
    if (priceItem?.type !== itemType.price) return

    const updatedHtml = getStringWithNewFormattedNumber({
      string: priceItem.price.html,
      oldNumber: priceItem.price.value,
      newNumber: price,
    })

    dispatch(itemsSlice.actions.updatePriceReducer({ itemIndex, html: updatedHtml, value: price }))

    void updateNumberAtHtmlIncrementally({
      oldNumber: priceItem.price.value,
      newNumber: price,
      editor: editorRef.current,
      html: priceItem.price.html,
    })
  }, [price])

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Total price...'
      htmlGetter={() => {
        const priceItem = getState().items[itemIndex]
        if (priceItem?.type !== itemType.price) return ''
        const html = priceItem.price.html
        return html
      }}
      onContentChange={() => {
        if (editorRef.current === null) return

        const priceItem = getState().items[itemIndex]
        if (priceItem?.type !== itemType.price) return

        const prevHtml = priceItem.price.html
        const html = editorRef.current.html.get()
        const didHtmlChange = prevHtml !== html

        if (!didHtmlChange) return

        const cellTextContent = getTextContentFromHtml({ html })
        const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

        dispatch(itemsSlice.actions.updatePriceReducer({ itemIndex, html, value: cellValueFromHtml }))

        saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
      }}
      onBlur={() => {
        validatePrice({ editorRef, itemIndex })
      }}
      onInitialized={() => {
        validatePrice({ editorRef, itemIndex })
      }}
    />
  )
}

type Props = {
  itemIndex: number
  items: Item[]
}

function getTotalPriceAbove({
  itemIndex,
  items,
}: Props): number {
  let totalPriceAbove = 0

  for (let i = itemIndex - 1; i >= 0; i--) {
    if (itemIndex === 0) break

    const isPriceItem = items.at(i)?.type === itemType.price

    if (isPriceItem) break

    const isBoqItem = items.at(i)?.type === itemType.boq

    if (isBoqItem) {
      const boqItem = items.at(i) as BoqItem
      const subTotalPrice = boqItem.boq.header.subTotalPrice.value
      totalPriceAbove = totalPriceAbove + subTotalPrice
    }
  }

  return totalPriceAbove
}

type Propss = {
  editorRef: FroalaEditorRef
  itemIndex: number
}

function validatePrice({
  editorRef,
  itemIndex,
}: Propss): void {
  if (editorRef.current === null) return

  const priceItem = getState().items[itemIndex]
  if (priceItem?.type !== itemType.price) return

  const currentHtml = editorRef.current.html.get()
  const cellTextContent = getTextContentFromHtml({ html: currentHtml })
  const cellValueFromHtml = getNumberFromString({ string: cellTextContent })

  const price = getTotalPriceAbove({ itemIndex, items: getState().items })
  const isCorrectValue = cellValueFromHtml === price

  if (isCorrectValue) return

  const updatedHtml = getStringWithNewFormattedNumber({
    string: priceItem.price.html,
    oldNumber: priceItem.price.value,
    newNumber: price,
  })

  dispatch(itemsSlice.actions.updatePriceReducer({ itemIndex, html: updatedHtml, value: price }))

  void updateNumberAtHtmlIncrementally({
    oldNumber: priceItem.price.value,
    newNumber: price,
    editor: editorRef.current,
    html: priceItem.price.html,
  })
}
