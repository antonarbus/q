import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { BoqHeader } from './boqHeader'
import { BoqTable } from './boqHeader/boqTable'
import { useRef } from 'react'
import { TRefDiv } from 'client/types'
import { useSaveItemHeightOnInitLoad } from '../items/useSaveItemHeightOnInitLoad'

type TProps = {
  index: number
}

export const BoqItem = ({ index }: TProps) => {
  const ref = useRef() as TRefDiv
  useSaveItemHeightOnInitLoad({ ref, index })

  return (
    <SortableResizableItemWithActions index={index} >
      <div ref={ref}>
        <BoqHeader index={index} />
        <BoqTable index={index} />
      </div>
    </SortableResizableItemWithActions>
  )
}
