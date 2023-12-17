import { BoqRows } from './rows'
import { BoqColumns } from './columns'
import { BoqTableLayout } from './BoqTableLayout'

export const BoqTable = (): JSX.Element => {
  return (
    <BoqTableLayout>
      <BoqColumns />
      <BoqRows />
    </BoqTableLayout>
  )
}
