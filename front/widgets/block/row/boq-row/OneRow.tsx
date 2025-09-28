import { BoqProvider } from '@entities/quotation'
import { RowLayout } from './RowLayout'
import { RowColumns } from './column'
import { BoqRows } from './row'
import type { JSX } from 'react'

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
