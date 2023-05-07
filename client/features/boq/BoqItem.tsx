import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { useRef } from 'react'
import { BoqHeader } from './boqHeader'
import { RefResizableType } from 'client/types'
import { BoqTable } from './boqHeader/boqTable'

type Props = {
  index: number
}

export const BoqItem = ({ index }: Props) => {
  const itemRef = useRef() as RefResizableType

  return (
    <SortableResizableItemWithActions
      index={index}
      itemRef={itemRef}
    >
      <BoqHeader index={index} itemRef={itemRef} />
      <BoqTable index={index} itemRef={itemRef} />
    </SortableResizableItemWithActions>
  )
}
