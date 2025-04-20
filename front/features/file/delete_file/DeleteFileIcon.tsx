import { Tooltip } from '@mui/material'
import { MdDeleteOutline } from 'react-icons/md'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'
import { theme } from '@shared/theme'

type Props = {
  isPending: boolean
}

export const DeleteFileIcon = ({ isPending }: Props): React.JSX.Element => {
  if (isPending) {
    return <RotatingLoaderIcon style={{ marginRight: '5px' }} />
  }

  return (
    <Tooltip
      title={`Delete`}
      placement='top'
    >
      <MdDeleteOutline
        css={{
          width: '14px',
          height: '14px',
          marginRight: '5px',
          color: 'grey',
          '&:hover': {
            color: theme.colors.red,
          },
        }}
      />
    </Tooltip>
  )
}
