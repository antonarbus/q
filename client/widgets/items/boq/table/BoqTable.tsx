import { BoqRows } from './rows'
import { BoqColumns } from './columns'
import { BoqTableLayout } from './BoqTableLayout'
import { type BoqEditorsRef } from 'client/entities/items'

type Props = {
  itemIndex: number
  boqEditorsRef: BoqEditorsRef
}

export const BoqTable = ({
  itemIndex,
  boqEditorsRef,
}: Props): JSX.Element => {
  return (
    <BoqTableLayout>
      <BoqColumns itemIndex={itemIndex} />
      <BoqRows
        itemIndex={itemIndex}
        boqEditorsRef={boqEditorsRef}
      />
    </BoqTableLayout>
  )
}
