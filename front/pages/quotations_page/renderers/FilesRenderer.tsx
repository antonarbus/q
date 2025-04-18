import { Tooltip, Box, Chip } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { QuotationPick } from '@back/api/quotation/getQuotationsHandler'
import { getState } from '@shared/lib/redux'
import { FiFileText } from 'react-icons/fi'

export const FilesRenderer = (
  params: ICellRendererParams<QuotationPick, QuotationPick['files']>,
): React.ReactNode => {
  const files = params.value

  if (!files || files.length === 0) {
    return null
  }

  const links = files.map((item) => {
    return (
      <Tooltip
        key={item.fileName}
        title={`${item.fileSizeInMb} Mb`}
        placement='top'
      >
        <Chip
          icon={<FiFileText style={{ height: '12px' }} />}
          component='a'
          href={`https://storage.googleapis.com/quotation-app-bucket/${getState().user.email}/files/${item.fileName}`}
          label={item.fileName}
          size='small'
          sx={{ cursor: 'pointer' }}
          onDelete={(e: Event) => {
            e.preventDefault()
            alert('Delete file?')
            alert('Under development')
          }}
        />
      </Tooltip>
    )
  })

  return (
    <Box sx={{ width: '100%', overflow: 'auto', display: 'flex', gap: '3px' }}>
      {links}
    </Box>
  )
}
