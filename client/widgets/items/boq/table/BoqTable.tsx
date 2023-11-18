import { BoqRows } from './rows'
import { BoqColumns } from './columns'
import { BoqTableLayout } from './BoqTableLayout'

type Props = {
  itemIndex: number
}

export const BoqTable = ({ itemIndex }: Props): JSX.Element => {
  return (
    <BoqTableLayout>
      <BoqColumns itemIndex={itemIndex} />
      <BoqRows itemIndex={itemIndex} />
    </BoqTableLayout>
  )
}
