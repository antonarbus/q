import { Chip } from '@mui/material'
import type { FileInfo } from '@entities/quotation/types'
import { DeleteFileIcon } from '@features/file/delete_file'
import { DownloadFileIcon, getFileUrl } from '@features/file/download_file'

type Props = {
  fileInfo: FileInfo
}

export const FileChip = ({ fileInfo }: Props): React.ReactNode => {
  return (
    <Chip
      key={fileInfo.fileName}
      icon={<DownloadFileIcon fileSize={fileInfo.fileSize} />}
      variant='outlined'
      deleteIcon={
        <DeleteFileIcon
          fileName={fileInfo.fileName}
          fileSize={fileInfo.fileSize}
        />
      }
      component='a'
      href={getFileUrl({ fileName: fileInfo.fileName })}
      label={fileInfo.fileName}
      onDelete={() => undefined} // handle it manually at DeleteFileIcon
      size='small'
      sx={{
        cursor: 'pointer',
        fontSize: '10px',
        '.MuiChip-label': { paddingLeft: '4px' },
      }}
    />
  )
}
