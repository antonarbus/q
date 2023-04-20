import { useSelectorTyped } from 'client/store'
import { ItemsContainer } from './ItemsContainer'
import { PasteItem } from '../copy/PasteItem'
import { ItemType } from './types'
import { TextItem } from '../text/TextItem'
import { EditableTextItem } from '../text/EditableTextItem'
import { BoqItem } from '../boq/BoqItem'

const equalityFn = (prevItems: any, currentItems: any) => {
  // re-render the list only if item is replaced or new item is added
  const isDifferentLength = prevItems.length !== currentItems.length
  if (isDifferentLength) return false
  const idsDoNotMatch = prevItems.some((item: ItemType, index: number) => prevItems[index]?.id !== currentItems[index]?.id)
  if (idsDoNotMatch) return false
  return true
}

export const Items = () => {
  const items = useSelectorTyped(state => state.items, equalityFn)

  return (
    <ItemsContainer>
      {items.map((item, index) => {
        if (item.type === 'text') return <TextItem key={item.id} index={index} />
        if (item.type === 'text editable') return <EditableTextItem key={item.id} index={index} />
        if (item.type === 'boq') return <BoqItem key={item.id} index={index} />
        if (item.type === 'paste') return <PasteItem key={item.id} />
        return null
      })}
    </ItemsContainer>
  )
}
