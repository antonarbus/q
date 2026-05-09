import { navItemId } from '@front/shared/nav/navItemId'
import { navSlice } from '@front/shared/nav/navSlice'
import { IconButton, Tooltip } from '@mui/material'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { LuBetweenHorizontalStart } from 'react-icons/lu'

export const OpenInsertMenuButton = (): React.ReactNode => {
  return (
    <Tooltip title='Insert'>
      <IconButton
        size='small'
        onClick={(): void => {
          reduxHolder.dispatch(navSlice.actions.openMenuWithId({ navItemId: navItemId.insert }))
        }}
      >
        <LuBetweenHorizontalStart />
      </IconButton>
    </Tooltip>
  )
}
