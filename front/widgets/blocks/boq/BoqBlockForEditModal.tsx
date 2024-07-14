import {
  onBoqBlockResize,
  onBoqBlockResizeStart,
  onBoqBlockResizeStop,
} from '@features/blocks/resize'
import { BlockComp } from '@entities/quotation'
import { BoqHeader } from './boq_header'
import { BoqTable } from './boq_table'

export const BoqBlockForEditModal = (): JSX.Element => {
  return (
    <BlockComp
      autoWidth={true}
      minWidth='560px'
      onItemResizeStart={onBoqBlockResizeStart}
      onItemResize={onBoqBlockResize}
      onItemResizeStop={onBoqBlockResizeStop}
      leftItemActionButtons={null}
      rightItemActionButtons={null}
    >
      <BoqHeader />
      <BoqTable />
    </BlockComp>
  )
}
