import { Chip, Tooltip } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { QuotationPick } from '@back/api/quotation/getQuotationsHandler'
import { Link } from 'react-router-dom'
import { route } from '@shared/consts/route'

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

  if (accessLevel === 'everyone') {
    return (
      <Link to={`share/${quotationId}`}>
        <Chip
          label='everyone'
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
      {userList.map((email) => {
        return (
          <Tooltip
            key={email}
            title={userList.join('; ')}
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
