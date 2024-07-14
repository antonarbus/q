import { BoqTableLayout } from './BoqTableLayout'
import { BoqColumns } from './columns'
import { BoqRows } from './rows'

export const BoqTable = (): JSX.Element => {
  return (
    <BoqTableLayout>
      <BoqColumns />
      <BoqRows />
    </BoqTableLayout>
  )
}
