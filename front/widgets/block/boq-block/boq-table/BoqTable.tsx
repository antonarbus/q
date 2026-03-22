import { BoqTableLayout } from './BoqTableLayout'
import { BoqColumns } from './column'
import { Rows } from './row'

export const BoqTable = (): React.JSX.Element => {
  return (
    <BoqTableLayout>
      <BoqColumns />
      <Rows />
    </BoqTableLayout>
  )
}
