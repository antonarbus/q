import parseHtml from 'html-react-parser'
import { ItemType } from '../items/types'
import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'

type Props = {
  item: ItemType
  index: number
}

export const TextItem = ({ item, index }: Props) => {
  return (
    <DraggableResizableItemWithActions
      index={index}
      item={item}
    >
      {parseHtml(item.innerHtml)}
    </DraggableResizableItemWithActions>
  )
}
