import { Chip, Tooltip } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { QuotationPick } from '@back/api/quotation/getQuotationListHandler'
import { Link } from 'react-router-dom'
import { route } from '@shared/const/route'
import { getTextWithBoldSubStringAsJsx } from '@shared/util/getTextWithBoldSubStringAsJsx'

type FilterModel = {
  access?: {
    filter: string
    filterType: string
    type: string
  }
}

export const SharedWithCellRenderer = (
  params: ICellRendererParams<QuotationPick, string>,
): React.ReactNode => {
  const quotationId = params.data?.id
  const accessLevel = params.data?.access.level
  const userList = params.data?.access.userList ?? []

  const filterModel = params.api.getFilterModel() as FilterModel
  const filterValue = filterModel.access?.filter ?? ''

  if (accessLevel === undefined) {
    return ''
  }

  if (params.value === 'nobody') {
    const text = getTextWithBoldSubStringAsJsx({
      text: 'nobody',
      subString: filterValue,
    })

    return (
      <Link to={`${route.share}/${quotationId}`}>
        <Chip
          color='warning'
          label={text}
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
    const text = getTextWithBoldSubStringAsJsx({
      text: 'everyone',
      subString: filterValue,
    })

    return (
      <Link to={`share/${quotationId}`}>
        <Chip
          color='info'
          label={text}
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
        const text = getTextWithBoldSubStringAsJsx({
          text: email,
          subString: filterValue,
        })

        return (
          <Tooltip
            key={email}
            placement='top'
            title={userList.join('; ')}
          >
            <Link to={`share/${quotationId}`}>
              <Chip
                label={text}
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
