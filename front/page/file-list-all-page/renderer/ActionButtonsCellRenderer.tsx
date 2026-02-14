import { DownloadFileIcon } from '@feature/file/download-file'
import { Box } from '@mui/material'
import type { ICellRendererParams } from 'ag-grid-community'
import type { ResBody } from '@back/api/file/getFileListAllHandler'

type Params = ICellRendererParams<ResBody['fileList'][number]>

export const ActionButtonsCellRenderer = (params: Params): React.ReactNode => {
  if (params.data?.id === undefined) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', gap: '5px' }}>
      <DownloadFileIcon fileSize={params.data.size} />
    </Box>
  )
}
