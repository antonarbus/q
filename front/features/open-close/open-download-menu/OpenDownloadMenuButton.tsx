import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { IconButton, Tooltip } from '@mui/material'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { FiDownload } from 'react-icons/fi'

export const OpenDownloadMenuButton = (): React.ReactNode => {
  return (
    <Tooltip title='Download'>
      <IconButton
        size='small'
        onClick={(): void => {
          reduxHolder.dispatch(navSlice.actions.openMenuWithId({ navItemId: navItemId.download }))
        }}
      >
        <FiDownload />
      </IconButton>
    </Tooltip>
  )
}
