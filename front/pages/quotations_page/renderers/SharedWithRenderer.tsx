import { Chip, Tooltip } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { QuotationPick } from '@back/api/quotation/getQuotationsRouter'

export const SharedWithRenderer = (
  params: ICellRendererParams<QuotationPick, QuotationPick['sharedWith']>,
): React.ReactNode => {
  if (
    !params.value ||
    (Array.isArray(params.value) && params.value.length === 0)
  ) {
    return (
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
    )
  }

  if (Array.isArray(params.value) && params.value.at(0) === '*') {
    return (
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
    )
  }

  return (
    <>
      {params.value.map((email) => {
        if (!params.value) return ''

        return (
          <Tooltip
            key={email}
            title={params.value.length > 1 ? params.value.join('; ') : ''}
            placement='top'
          >
            <Chip
              label={email}
              variant='outlined'
              sx={{
                width: 'min-content',
                margin: '2px',
                fontSize: '10px',
              }}
            />
          </Tooltip>
        )
      })}
    </>
  )
}
