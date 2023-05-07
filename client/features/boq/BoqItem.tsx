import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { useRef } from 'react'
import { BoqHeader } from './boqHeader'
import { TRefResizable } from 'client/types'
import { BoqTable } from './boqHeader/boqTable'

type TProps = {
  index: number
}

export const BoqItem = ({ index }: TProps) => {
  const itemRef = useRef() as TRefResizable

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
