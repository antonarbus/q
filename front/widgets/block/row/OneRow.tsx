import { BoqProvider } from '@entities/quotation/provider/BoqBlockProvider'
import type { JSX } from 'react'
import { RowColumns } from './column'
import { RowLayout } from './RowLayout'
import { Rows } from './row'

export const OneRow = (): JSX.Element => {
  return (
    <BoqProvider>
      <RowLayout>
        <RowColumns />
        <Rows />
      </RowLayout>
    </BoqProvider>
  )
}
