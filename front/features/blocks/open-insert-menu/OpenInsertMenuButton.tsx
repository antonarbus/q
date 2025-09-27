import { IconButton } from '@mui/material'
import { navItemId } from '@shared/const/navItemId'
import { dispatch } from '@shared/lib/redux'
import { navSlice } from '@shared/nav'
import { FaPlus } from 'react-icons/fa6'

export const OpenInsertMenuButton = (): React.ReactNode => {
  return (
    <IconButton
      onClick={() => {
        dispatch(
          navSlice.actions.openMenuWithId({ navItemId: navItemId.insert }),
        )
      }}
    >
      <FaPlus />
    </IconButton>
  )
}
