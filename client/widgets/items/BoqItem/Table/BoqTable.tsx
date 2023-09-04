import { BoqRows } from './boq_rows/BoqRows'
import { BoqColsHeader } from './boq_cols_header'
import { BoqTableLayout } from 'client/shared/layouts'

interface Props {
  index: number
}

export const BoqTable = ({ index }: Props): JSX.Element => {
  return (
    <BoqTableLayout>
      <BoqColsHeader index={index} />
      <BoqRows index={index} />
    </BoqTableLayout>
  )
}
