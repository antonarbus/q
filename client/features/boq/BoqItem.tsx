import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { BoqHeader } from './boqHeader'
import { BoqTable } from './boqTable'
import { useRef } from 'react'
import { TRefDiv } from 'client/types'
import { useSaveItemHeightOnInitLoad } from '../items/useSaveItemHeightOnInitLoad'

type TProps = {
  index: number
}

export const BoqItem = ({ index }: TProps) => {
  // console.log('BoqItem rendered', index)
  const itemRef = useRef() as TRefDiv
  useSaveItemHeightOnInitLoad({ itemRef, index })

  return (
    <SortableResizableItemWithActions index={index} >
      <div ref={itemRef}>
        <BoqHeader index={index} />
        <BoqTable index={index} />
      </div>
    </SortableResizableItemWithActions>
  )
}
