import { Chip, Tooltip } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { QuotationPick } from '@back/api/quotation/getQuotationsHandler'
import { Link } from 'react-router-dom'

export const SharedWithRenderer = (
  params: ICellRendererParams<QuotationPick, QuotationPick['sharedWith']>,
): React.ReactNode => {
  const sharedWith = params.value ?? []
  const isSharedWithEverybody = sharedWith.at(0) === '*'
  const isSharedWithNobody = sharedWith.length === 0
  const quotationId = params.data?.id

  if (isSharedWithNobody) {
    return (
      <Link to={`share/${quotationId}`}>
        <Chip
          label='nobody'
          variant='outlined'
          color='warning'
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
