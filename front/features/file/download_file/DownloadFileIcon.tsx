import { Tooltip } from '@mui/material'
import { HiDownload } from 'react-icons/hi'
import type { FileInfo } from '@entities/quotation/types'

type Props = {
  fileInfo: FileInfo
}

export const DownloadFileIcon = ({ fileInfo }: Props): React.JSX.Element => {
  return (
    <Tooltip
      title={`Download ${fileInfo.fileSizeInMb} Mb`}
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
