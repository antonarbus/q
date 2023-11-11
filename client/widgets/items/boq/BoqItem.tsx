import { onBoqItemResizeStart, onBoqItemResizeStop } from 'client/features/resize_item'
import { Header } from './header'
import { BoqTable } from './table/BoqTable'
import { Item } from 'client/entities/items'
import { ItemActions } from 'client/features/item_actions'

type Props = {
  itemIndex: number
}

export const BoqItem = ({ itemIndex }: Props): JSX.Element => {
  return (
    <Item
      itemIndex={itemIndex}
      autoWidth={true}
      onItemResizeStop={onBoqItemResizeStop}
      onItemResizeStart={onBoqItemResizeStart}
      itemActions={<ItemActions itemIndex={itemIndex} />}
    >
      <Header itemIndex={itemIndex} />
      <BoqTable itemIndex={itemIndex} />
    </Item>
  )
}
