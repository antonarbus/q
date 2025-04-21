import { Chip, Tooltip } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { QuotationPick } from '@back/api/quotation/getQuotationsHandler'
import { Link } from 'react-router-dom'
import { route } from '@shared/consts/route'

export const SharedWithCellRenderer = (
  params: ICellRendererParams<QuotationPick, QuotationPick['sharedWith']>,
): React.ReactNode => {
  const sharedWith = params.data?.sharedWith ?? []
  const isSharedWithEverybody = sharedWith.at(0) === '*'
  const isSharedWithNobody = sharedWith.length === 0
  const quotationId = params.data?.id

  if (isSharedWithNobody) {
    return (
      <Link to={`${route.share}/${quotationId}`}>
        <Chip
          label='nobody'
          variant='outlined'
          color='warning'
          size='small'
          sx={{
            width: 'min-content',
            margin: '2px',
            fontSize: '10px',
          }}
        />
      </Link>
    )
  }

  if (isSharedWithEverybody) {
    return (
      <Link to={`share/${quotationId}`}>
        <Chip
          label='everybody'
          variant='outlined'
          color='info'
          size='small'
          sx={{
            width: 'min-content',
            margin: '2px',
            fontSize: '10px',
          }}
        />
      </Link>
    )
  }

  return (
    <>
      {sharedWith.map((email) => {
        return (
          <Tooltip
            key={email}
            title={sharedWith.join('; ')}
            placement='top'
          >
            <Link to={`share/${quotationId}`}>
              <Chip
                label={email}
                variant='outlined'
                size='small'
                sx={{
                  width: 'min-content',
                  margin: '2px',
                  fontSize: '10px',
                }}
              />
            </Link>
          </Tooltip>
        )
      })}
    </>
  )
}
