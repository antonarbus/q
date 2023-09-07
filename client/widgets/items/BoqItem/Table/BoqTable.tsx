import { BoqRows } from './boq_rows/BoqRows'
import { BoqColsHeader } from './boq_cols_header'
import { BoqTableLayout } from 'client/shared/layouts'

interface Props {
  itemIndex: number
}

export const BoqTable = ({ itemIndex }: Props): JSX.Element => {
  return (
    <BoqTableLayout>
      <BoqColsHeader itemIndex={itemIndex} />
      <BoqRows itemIndex={itemIndex} />
    </BoqTableLayout>
  )
}
