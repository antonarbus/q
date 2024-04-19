import type { ICellRendererParams } from 'ag-grid-community'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { type Quotation } from '@entities/quotation'

export const LinkRenderer = (params: ICellRendererParams<Quotation>): ReactNode => {
  const id = params.data?.id

  return (
    <Link
      to={`/${id}`}
      target='_blank'
      rel='noreferrer'
    >
      {id}
    </Link>
  )
}
