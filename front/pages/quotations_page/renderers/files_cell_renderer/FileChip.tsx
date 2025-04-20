import { Chip } from '@mui/material'
import type { FileInfo } from '@entities/quotation/types'
import { DeleteFileIcon, useFileDelete } from '@features/file/delete_file'
import { DownloadFileIcon, getFileUrl } from '@features/file/download_file'

type Props = {
  fileInfo: FileInfo
}

export const FileChip = ({ fileInfo }: Props): React.ReactNode => {
  const { isPending, isSuccess, onDeleteClick } = useFileDelete({
    fileInfo,
  })

  if (isSuccess) {
    return null
  }

  return (
    <Chip
      key={fileInfo.fileName}
      icon={<DownloadFileIcon fileInfo={fileInfo} />}
      variant='outlined'
      deleteIcon={<DeleteFileIcon isPending={isPending} />}
      component='a'
      href={getFileUrl({ fileName: fileInfo.fileName })}
      label={fileInfo.fileName}
      onDelete={onDeleteClick}
      size='small'
      sx={{
        cursor: 'pointer',
        fontSize: '10px',
        '.MuiChip-label': { paddingLeft: '4px' },
      }}
    />
  )
}
