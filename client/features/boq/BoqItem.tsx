import { DraggableResizableItemWithActions } from 'client/components/DraggableResizableItemWithActions'
import { useRef } from 'react'
import { BoqHeader } from './boqHeader'
import { RefResizableType } from 'client/types'

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
