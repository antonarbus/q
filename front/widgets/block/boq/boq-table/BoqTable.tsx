import type { JSX } from 'react'
import { BoqTableLayout } from './BoqTableLayout'
import { BoqColumns } from './column'
import { BoqRows } from './row'

export const BoqTable = (): JSX.Element => {
  return (
    <BoqTableLayout>
      <BoqColumns />
      <BoqRows />
    </BoqTableLayout>
  )
}
