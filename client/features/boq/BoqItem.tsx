import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { BoqHeader } from './boqHeader'
import { BoqTable } from './boqHeader/boqTable'
import { useRef } from 'react'
import { TRefDiv } from 'client/types'

type TProps = {
  index: number
}

export const BoqItem = ({ index }: TProps) => {
  const ref = useRef() as TRefDiv

  return (
    <SortableResizableItemWithActions index={index} >
      <div ref={ref}>
        <BoqHeader index={index} />
        <BoqTable index={index} />
      </div>
    </SortableResizableItemWithActions>
  )
}
