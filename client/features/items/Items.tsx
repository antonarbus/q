import { useSelectorTyped } from 'client/store'
import { ItemsContainer } from './ItemsContainer'
import { PasteItem } from '../copy/PasteItem'
import { TItem } from './types'
import { TextItem } from '../text/TextItem'
import { BoqItem } from '../boq/BoqItem'

const equalityFn = (prevItems: any, currentItems: any) => {
  // re-render the list only if item is replaced or new item is added
  const isDifferentLength = prevItems.length !== currentItems.length
  if (isDifferentLength) return false
  const idsDoNotMatch = prevItems.some((item: TItem, index: number) => prevItems[index]?.id !== currentItems[index]?.id)
  if (idsDoNotMatch) return false
  return true
}

export const Items = () => {
  const items = useSelectorTyped(state => state.items, equalityFn)
  //* just to refresh the offer on reset to default items
  const isOfferToBeReRendered = useSelectorTyped(state => state.offer.toggleOffer)
  console.log(666)

  return (
    <ItemsContainer>
      {items.map((item, index) => {
        if (item.type === 'text') return <TextItem key={item.id + isOfferToBeReRendered} index={index} />
        if (item.type === 'boq') return <BoqItem key={item.id + isOfferToBeReRendered} index={index} />
        if (item.type === 'paste') return <PasteItem key={item.id + isOfferToBeReRendered} />
        return null
      })}
    </ItemsContainer>
  )
}
