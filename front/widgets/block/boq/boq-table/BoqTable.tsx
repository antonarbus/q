import { BoqTableLayout } from './BoqTableLayout'
import { BoqColumns } from './column'
import { BoqRows } from './row'

export const BoqTable = (): React.JSX.Element => {
  return (
    <BoqTableLayout>
      <BoqColumns />
      <BoqRows />
    </BoqTableLayout>
  )
}
