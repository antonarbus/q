import { Tooltip } from '@mui/material'
import { RotatingLoaderIcon } from '@shared/component/RotatingLoaderIcon'
import { theme } from '@shared/theme'
import type { JSX } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { useFileDelete } from './useFileDelete'

type Props = {
  fileId: string
}

export const DeleteFileIcon = ({ fileId }: Props): JSX.Element => {
  const { isPending, onDeleteClick } = useFileDelete({ fileId })

  if (isPending === true) {
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
            color: theme.colors.red,
          },
        }}
        onClick={onDeleteClick}
      />
    </Tooltip>
  )
}
