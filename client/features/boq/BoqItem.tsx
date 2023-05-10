import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { BoqHeader } from './boqHeader'
import { BoqTable } from './boqHeader/boqTable'

type TProps = {
  index: number
}

export const BoqItem = ({ index }: TProps) => {
  return (
    <SortableResizableItemWithActions index={index} >
      <BoqHeader index={index} />
      <BoqTable index={index} />
    </SortableResizableItemWithActions>
  )
}
