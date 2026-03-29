import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { Box, IconButton } from '@mui/material'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux'
import { FaPlus } from 'react-icons/fa6'

export const OpenInsertMenuButton = (): React.ReactNode => {
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <IconButton
        className={cls.openInsertMenuButton}
        onClick={() => {
          reduxHolder.dispatch(navSlice.actions.openMenuWithId({ navItemId: navItemId.insert }))
        }}
      >
        <FaPlus />
      </IconButton>
    </Box>
  )
}
