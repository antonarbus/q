import { SortableResizableItemWithActions } from 'client/components/SortableResizableItemWithActions'
import { BoqHeader } from './boqHeader'
import { BoqTable } from './boqTable'

type Props = {
  index: number
}

export const BoqItem = ({ index }: Props) => {
  return (
    <SortableResizableItemWithActions index={index} >
      <BoqHeader index={index} />
      <BoqTable index={index} />
    </SortableResizableItemWithActions>
  )
}
