import { onBoqItemResize, onBoqItemResizeStart, onBoqItemResizeStop } from 'client/features/resize_item'
import { Header } from './header'
import { BoqTable } from './table/BoqTable'
import { type BoqEditorsRef, Item } from 'client/entities/items'
import { ItemActions } from 'client/features/item_actions'
import { useRef } from 'react'

type Props = {
  itemIndex: number
}

export const BoqItem = ({ itemIndex }: Props): JSX.Element => {
  const boqEditorsRef: BoqEditorsRef = useRef({
    subTotalEditor: null,
  })

  return (
    <Item
      itemIndex={itemIndex}
      autoWidth={true}
      onItemResizeStart={onBoqItemResizeStart}
      onItemResize={onBoqItemResize}
      onItemResizeStop={onBoqItemResizeStop}
      itemActions={<ItemActions itemIndex={itemIndex} />}
    >
      <Header
        itemIndex={itemIndex}
        boqEditorsRef={boqEditorsRef}
      />
      <BoqTable
        itemIndex={itemIndex}
        boqEditorsRef={boqEditorsRef}
      />
    </Item>
  )
}
