import { IconButton } from '@mui/material'
import { cls } from '@shared/cls'
import { dispatch } from '@shared/lib/redux'
import { navItemId } from '@shared/nav/navItemId'
import { navSlice } from '@shared/nav/navSlice'
import type { ReactNode } from 'react'
import { FaPlus } from 'react-icons/fa6'

export const OpenInsertMenuButton = (): ReactNode => {
  return (
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
  )
}
