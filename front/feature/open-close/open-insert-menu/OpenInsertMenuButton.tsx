import { navItemId } from '@entity/nav/navItemId'
import { navSlice } from '@entity/nav/navSlice'
import { Box, IconButton } from '@mui/material'
import { cls } from '@shared/cls'
import { dispatch } from '@shared/lib/redux'
import type { ReactNode } from 'react'
import { FaPlus } from 'react-icons/fa6'

export const OpenInsertMenuButton = (): ReactNode => {
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <IconButton
        className={cls.openInsertMenuButton}
        onClick={() => {
          dispatch(
            navSlice.actions.openMenuWithId({ navItemId: navItemId.insert }),
          )
        }}
      >
        <FaPlus />
      </IconButton>
    </Box>
  )
}
