import parseHtml from 'html-react-parser'
import { ItemType } from '../items/types'
import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { useRef } from 'react'
import { Resizable } from 're-resizable'
import { BoqHeader } from './BoqHeader'

type Props = {
  item: ItemType
  index: number
}

export const BoqItem = ({ item, index }: Props) => {
  const itemRef = useRef() as React.MutableRefObject<Resizable>

  return (
    <DraggableResizableItemWithActions
      index={index}
      itemRef={itemRef}
    >
      <BoqHeader>boq header</BoqHeader>
      {parseHtml(item.html)}
    </DraggableResizableItemWithActions>
  )
}
