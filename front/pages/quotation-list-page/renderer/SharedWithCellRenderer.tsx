import { Chip, Tooltip } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { QuotationPick } from '@back/api/quotation/getQuotationsHandler'
import { Link } from 'react-router-dom'
import { route } from '@shared/const/route'

export const SharedWithCellRenderer = (
  params: ICellRendererParams<QuotationPick, QuotationPick['access']>,
): React.ReactNode => {
  const quotationId = params.data?.id
  const accessLevel = params.data?.access.level
  const userList = params.data?.access.userList ?? []

  if (accessLevel === undefined) {
    return ''
  }

  if (accessLevel === 'nobody') {
    return (
      <Link to={`${route.share}/${quotationId}`}>
        <Chip
          color='warning'
          label='nobody'
          size='small'
          sx={{
            width: 'min-content',
            margin: '2px',
            fontSize: '10px',
          }}
          variant='outlined'
        />
      </Link>
    )
  }

  if (accessLevel === 'everyone') {
    return (
      <Link to={`share/${quotationId}`}>
        <Chip
          color='info'
          label='everyone'
          size='small'
          sx={{
            width: 'min-content',
            margin: '2px',
            fontSize: '10px',
          }}
          variant='outlined'
        />
      </Link>
    )
  }

  return (
    <>
      {userList.map((email) => {
        return (
          <Tooltip
            key={email}
            placement='top'
            title={userList.join('; ')}
          >
            <Link to={`share/${quotationId}`}>
              <Chip
                label={email}
                size='small'
                sx={{
                  width: 'min-content',
                  margin: '2px',
                  fontSize: '10px',
                }}
                variant='outlined'
              />
            </Link>
          </Tooltip>
        )
      })}
    </>
  )
}
