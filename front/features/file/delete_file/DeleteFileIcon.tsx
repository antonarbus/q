import { Tooltip } from '@mui/material'
import { MdDeleteOutline } from 'react-icons/md'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { theme } from '@shared/theme'
import { useFileDelete } from './useFileDelete'
import type { FileInfo } from '@entities/quotation/types'

type Props = {
  fileName: FileInfo['fileName']
  fileSize: FileInfo['fileSize']
}

export const DeleteFileIcon = ({
  fileName,
  fileSize,
}: Props): React.JSX.Element => {
  const { isPending, onDeleteClick } = useFileDelete({ fileName, fileSize })

  if (isPending) {
    return <RotatingLoaderIcon style={{ marginRight: '5px' }} />
  }

  return (
    <Tooltip
      title={`Delete`}
      placement='top'
    >
      <MdDeleteOutline
        onClick={onDeleteClick}
        css={{
          width: '14px',
          height: '14px',
          marginRight: '5px',
          color: 'grey',
          cursor: 'pointer',
          '&:hover': {
            color: theme.colors.red,
          },
        }}
      />
    </Tooltip>
  )
}
