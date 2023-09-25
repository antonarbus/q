import { onBoqItemResizeStart, onBoqItemResizeStop } from 'client/features/resize_item'
import { Item } from '../item'
import { Header } from './Header'
import { BoqTable } from './Table/BoqTable'

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
    >
      <Header itemIndex={itemIndex} />
      <BoqTable itemIndex={itemIndex} />
    </Item>
  )
}
