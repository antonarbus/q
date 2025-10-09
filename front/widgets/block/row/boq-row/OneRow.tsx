import { BoqProvider } from '@entities/quotation'
import type { JSX } from 'react'
import { RowColumns } from './column'
import { RowLayout } from './RowLayout'
import { BoqRows } from './row'

export const OneRow = (): JSX.Element => {
  return (
    <BoqProvider>
      <RowLayout>
        <RowColumns />
        <BoqRows />
      </RowLayout>
    </BoqProvider>
  )
}
