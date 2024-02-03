import { getState, useSelectorTyped } from '@lib_instances/store'
import { useRef } from 'react'
import { useUpdateEffect } from 'react-use'
import { useItem, Froala, itemType, updatePriceAtStore, saveItemsLocally } from '@entities/items'
import { type FroalaEditor } from '@shared/types'

export const PriceValue = (): JSX.Element => {
  const editorRef = useRef<FroalaEditor | null>(null)
  const { itemIndex } = useItem()

  const price = useSelectorTyped(state => {
    const items = state.items
    const totalPriceAbove = items.reduce((accumulator, item, index) => {
      if (index >= itemIndex) return accumulator

      if (item.type === itemType.boq) {
        return accumulator + item.boq.header.subTotalPrice.value
      }

      return accumulator
    }, 0)

    return totalPriceAbove
  })

  useUpdateEffect(() => {

  }, [price])

  console.log('🚀 ~ price:', price)

  return (
    <Froala
      editorRef={editorRef}
      placeholder='Total price...'
      htmlGetter={() => {
        const priceItem = getState().items[itemIndex]
        if (priceItem?.type !== itemType.price) return ''
        const priceHtml = priceItem.price.html
        return priceHtml
      }}
      onContentChange={() => {
        const { didUpdate } = updatePriceAtStore({ editorRef, itemIndex })

        if (didUpdate) {
          saveItemsLocally({ msgAboveItemWithIndex: itemIndex })
        }

        // todo: allow to style, but put value automatically, do not allow to update it manually
        // todo: maybe check if value is correct on blur
      }}
    />
  )
}
