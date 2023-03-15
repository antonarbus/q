import { useSelectorTyped } from 'client/store'
import { ItemsContainer } from './ItemsContainer'
import { PasteText } from '../copy/PasteText'
import { TextItem } from './TextItem'

export const Items = () => {
  const items = useSelectorTyped(state => state.offer.items)

  return (
    <ItemsContainer>
      {items.map((item, index) => {
        if (item.type === 'text') return <TextItem key={item.id} item={item} index={index} />
        if (item.type === 'paste') return <PasteText key={item.id} />
        return null
      })}
    </ItemsContainer>
  )
}
