import { Chip } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { ReactNode } from 'react'
import { type Quotation } from '@entities/quotation'

export const SharedWithRenderer = (
  params: ICellRendererParams<Quotation, Quotation['sharedWith']>,
): ReactNode => {
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
        return (
          <Chip
            key={email}
            label={email}
            variant='outlined'
            sx={{
              width: 'min-content',
              margin: '2px',
              fontSize: '10px',
            }}
          />
        )
      })}
    </>
  )
}
