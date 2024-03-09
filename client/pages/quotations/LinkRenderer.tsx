import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ICellRendererParams } from 'ag-grid-community'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

export const LinkRenderer = (params: ICellRendererParams<QuotationModelType>): ReactNode => {
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
