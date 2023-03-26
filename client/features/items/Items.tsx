import { useSelectorTyped } from 'client/store'
import { ItemsContainer } from './ItemsContainer'
import { PasteText } from '../copy/PasteText'
import { FroalaItem } from '../FroalaItem'
import { TextItem } from './TextItem'
import { shallowEqual } from 'react-redux'
import { ItemsType, ItemType } from './types'
// import { selectItemsShape } from './itemsSlice'

const equalityFn = (prevItems:any, currentItems:any) => {
  const isDifferentLength = prevItems.length !== currentItems.length
  if (isDifferentLength) return false
  const idsDoNotMatch = prevItems.some((item: ItemType, index: number) => prevItems[index]?.id !== currentItems[index]?.id)
  if (idsDoNotMatch) return false
  return true
}

export const Items = () => {
  // const itemsShape = useSelectorTyped(selectItemsShape)
  // const itemsShape = useSelectorTyped(state => state.items)
  const items = useSelectorTyped(state => state.items, equalityFn)
  // const items = useSelectorTyped(state => state.items.map(({ id }) => ({ id })), shallowEqual)

  return (
    <ItemsContainer>
      {items.map((item, index) => {
        if (item.type === 'text') return <TextItem key={item.id} item={item} index={index} />
        if (item.type === 'text editable') return <FroalaItem key={item.id} item={item} index={index} />
        if (item.type === 'paste') return <PasteText key={item.id} />
        return null
      })}
    </ItemsContainer>
  )
}
