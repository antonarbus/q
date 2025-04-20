import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { QuotationPick } from '@back/api/quotation/getQuotationsHandler'
import uniqBy from 'lodash.uniqby'
import { FileChip } from './FileChip'

export const FilesCellRenderer = (
  params: ICellRendererParams<QuotationPick, QuotationPick['files']>,
): React.ReactNode => {
  const files = uniqBy(params.value ?? [], 'fileName')

  if (files.length === 0) {
    return null
  }

  return (
    <Box sx={{ width: '100%', overflow: 'auto', display: 'flex', gap: '3px' }}>
      {files.map((item) => {
        return (
          <FileChip
            key={item.fileName}
            fileInfo={item}
          />
        )
      })}
    </Box>
  )
}
