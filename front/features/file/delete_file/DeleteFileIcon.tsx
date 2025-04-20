import { Tooltip } from '@mui/material'
import { MdDeleteOutline } from 'react-icons/md'
import { RotatingLoaderIcon } from '@shared/components/RotatingLoaderIcon'

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
          marginRight: '5px',
          color: 'grey',
          '&:hover': {
            color: 'black',
          },
        }}
      />
    </Tooltip>
  )
}
