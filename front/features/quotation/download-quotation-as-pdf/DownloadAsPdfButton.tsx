import { IconButton, Tooltip } from '@mui/material'
import { FiDownload } from 'react-icons/fi'
import { downloadPdf } from './downloadPdf'

export const DownloadAsPdfButton = (): React.ReactNode => {
  return (
    <Tooltip title='Download'>
      <IconButton size='small' onClick={downloadPdf}>
        <FiDownload />
      </IconButton>
    </Tooltip>
  )
}
