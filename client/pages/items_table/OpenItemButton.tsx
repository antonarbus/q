import { IconButton } from '@mui/material'
import type { ReactNode } from 'react'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { Link } from 'react-router-dom'

type Props = {
  id: string
}

export const OpenItemButton = ({ id }: Props): ReactNode => {
  return (
    <Link
      to={`/${id}`}
    >
      <IconButton
        size='small'
    >
      <AiOutlineFolderOpen />
    </IconButton>
    </Link>
  )
}
