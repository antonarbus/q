import { navItemId } from '@entities/nav/navItemId'
import { navSlice } from '@entities/nav/navSlice'
import { IconButton } from '@mui/material'
import { cls } from '@shared/cls'
import { dispatch } from '@shared/lib/redux'
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
