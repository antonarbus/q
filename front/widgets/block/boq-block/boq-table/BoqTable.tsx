import type { JSX } from 'react'
import { BoqTableLayout } from './BoqTableLayout'
import { BoqColumns } from './column'
import { Rows } from './row'

export const BoqTable = (): JSX.Element => {
  return (
    <BoqTableLayout>
      <BoqColumns />
      <Rows />
    </BoqTableLayout>
  )
}
