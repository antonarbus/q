import { useSelectorTyped } from 'client/store'
import { ItemsContainer } from './ItemsContainer'
import { PasteText } from '../copy/PasteText'
import { FroalaItem } from '../FroalaItem'
import { TextItem } from './TextItem'
import { selectItemsShape } from './itemsSlice'

export const Items = () => {
  const itemsShape = useSelectorTyped(selectItemsShape)

  return (
    <ItemsContainer>
      {itemsShape.map((item, index) => {
        if (item.type === 'text') return <TextItem key={item.id} item={item} index={index} />
        if (item.type === 'text editable') return <FroalaItem key={item.id} item={item} index={index} />
        if (item.type === 'paste') return <PasteText key={item.id} />
        return null
      })}
    </ItemsContainer>
  )
}
