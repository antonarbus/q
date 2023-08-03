import { useSelectorTyped } from 'client/shared/hooks'
import { ItemsContainer } from './ItemsContainer'
import type { Item } from '../../entities/items/model/types'
import { PasteItem, TextItem } from 'client/entities/items'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EqualityFn = (a: any, b: any) => boolean

// re-render the list only if item is replaced or new item is added
const equalityFn: EqualityFn = (prevItems: Item[], currentItems: Item[]): boolean => {
  const isDifferentLength = prevItems.length !== currentItems.length
  if (isDifferentLength) return false
  const idsDoNotMatch = prevItems.some((item: Item, index: number) => prevItems[index]?.id !== currentItems[index]?.id)
  if (idsDoNotMatch) return false
  return true
}

export const Items = (): JSX.Element => {
  const items = useSelectorTyped((state) => state.items, equalityFn)
  const shouldReRender = useSelectorTyped((state) => state.offer.toggleOffer)

  return (
    <ItemsContainer>
      {items.map((item, index) => {
        const key = item.id + shouldReRender.toString()

        if (item.type === 'text') return <TextItem key={key} index={index} />
        if (item.type === 'boq') return <div key={key}>boq</div>
        return <PasteItem key={key} />
      })}
    </ItemsContainer>
  )
}

