import { BoqProvider } from '@entities/quotation'
import { RowLayout } from './RowLayout'
import { RowColumns } from './column'
import { BoqRows } from './row'

export const OneRow = (): React.JSX.Element => {
  return (
    <BoqProvider>
      <RowLayout>
        <RowColumns />
        <BoqRows />
      </RowLayout>
    </BoqProvider>
  )
}
