import { IconButton } from '@mui/material'
import { cls } from '@shared/const/cls'
import { navItemId } from '@shared/const/navItemId'
import { dispatch } from '@shared/lib/redux'
import { navSlice } from '@shared/nav'
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
