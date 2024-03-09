import { IconButton } from '@mui/material'
import { type QuotationModelType } from '@server/db/models/quotationModel'
import type { ICellRendererParams } from 'ag-grid-community'
import type { ReactNode } from 'react'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export const OpenQuotationButton = (params: ICellRendererParams<QuotationModelType>): ReactNode => {
  if (params.data === undefined) return null

  return (
    <Link
      to={`/${params.data.id}`}
    >
      <IconButton
        size='small'
    >
      <AiOutlineFolderOpen />
    </IconButton>
    </Link>
  )
}
