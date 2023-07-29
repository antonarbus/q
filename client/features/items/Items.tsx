import { useSelectorTyped } from 'client/store'
import { ItemsContainer } from './ItemsContainer'
import { PasteItem } from '../copy/PasteItem'
import { Item } from './types'
import { TextItem } from '../text/TextItem'
import { BoqItem } from '../boq/BoqItem'

// re-render the list only if item is replaced or new item is added
const equalityFn = (prevItems: any, currentItems: any) => {
  const isDifferentLength = prevItems.length !== currentItems.length
  if (isDifferentLength) return false
  const idsDoNotMatch = prevItems.some((item: Item, index: number) =>
    prevItems[index]?.id !== currentItems[index]?.id)
  if (idsDoNotMatch) return false
  return true
}

export const Items = () => {
  const items = useSelectorTyped(state => state.items, equalityFn)
  const shouldReRender = useSelectorTyped(state => state.offer.toggleOffer)

  return (
    <ItemsContainer>
      {items.map((item, index) => {
        if (!item) return null
        const key = item.id + shouldReRender.toString()

        if (item.type === 'text') return <TextItem key={key} index={index} />
        if (item.type === 'boq') return <BoqItem key={key} index={index} />
        if (item.type === 'paste') return <PasteItem key={key} />
        return null
      })}
    </ItemsContainer>
  )
}
