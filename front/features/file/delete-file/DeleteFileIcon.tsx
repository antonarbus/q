import { Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@front/shared/component/RotatingLoaderIcon'
import { theme } from '@front/shared/theme'
import { MdDeleteOutline } from 'react-icons/md'
import { useDeleteFile } from './useDeleteFile'

type Props = {
  fileId: string
}

export const DeleteFileIcon = (props: Props): React.JSX.Element => {
  const deleteFile = useDeleteFile({ fileId: props.fileId })

  if (deleteFile.isPending === true) {
    return <RotatingLoaderIcon style={{ marginRight: '5px' }} />
  }

  return (
    <Tooltip placement='top' title='Delete'>
      <MdDeleteOutline
        css={{
          width: '14px',
          height: '14px',
          marginRight: '5px',
          color: 'grey',
          cursor: 'pointer',
          '&:hover': {
            color: theme.color.red,
          },
        }}
        onClick={deleteFile.handleClick}
      />
    </Tooltip>
  )
}
