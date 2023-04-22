import parseHtml from 'html-react-parser'
import { ItemType } from '../items/types'
import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { useRef } from 'react'
import { Resizable } from 're-resizable'
import { BoqHeader } from './boqHeader'

type Props = {
  index: number
}

export const BoqItem = ({ index }: Props) => {
  const itemRef = useRef() as RefResizableType

  return (
    <DraggableResizableItemWithActions
      index={index}
      itemRef={itemRef}
    >
      <BoqHeader index={index} itemRef={itemRef} />
      666
    </DraggableResizableItemWithActions>
  )
}
