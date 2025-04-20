import { Tooltip } from '@mui/material'
import { HiDownload } from 'react-icons/hi'
import type { FileInfo } from '@entities/quotation/types'
import { format } from 'bytes'

type Props = {
  fileSize: FileInfo['fileSize']
}

export const DownloadFileIcon = ({ fileSize }: Props): React.JSX.Element => {
  const fileSizeFormatted = format(fileSize, {
    unit: fileSize < 1_048_576 ? 'kb' : 'mb',
    thousandsSeparator: ' ',
    unitSeparator: ' ',
  })

  return (
    <Tooltip
      title={`Download ${fileSizeFormatted}`}
      placement='top'
    >
      <HiDownload
        css={{
          width: '14px',
          height: '14px',
          marginLeft: '5px',
          color: 'grey',
          '&:hover': {
            color: 'black',
          },
        }}
      />
    </Tooltip>
  )
}
