import { BoqTableLayout } from './BoqTableLayout'
import { BoqColumns } from './column'
import { BoqRows } from './row'
import type { JSX } from 'react'

export const BoqTable = (): JSX.Element => {
  return (
    <BoqTableLayout>
      <BoqColumns />
      <BoqRows />
    </BoqTableLayout>
  )
}
