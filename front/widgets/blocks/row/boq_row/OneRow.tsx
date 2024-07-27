import { BoqItemProvider } from '@entities/quotation'
import { RowLayout } from './RowLayout'
import { RowColumns } from './columns'
import { BoqRows } from './rows'

export const OneRow = (): JSX.Element => {
  return (
    <BoqItemProvider>
      <RowLayout>
        <RowColumns />
        <BoqRows />
      </RowLayout>
    </BoqItemProvider>
  )
}
