/* eslint-disable react/jsx-max-depth */
import { IconButton, Tooltip } from '@mui/material'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Props = {
  id: string
}

export const OpenQuotationPageAndLoadFromServerButton = ({
  id,
}: Props): ReactNode => {
  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      placement='bottom'
      title='Open'
    >
      <Link to={`/${id}`}>
        <IconButton size='small'>
          <AiOutlineFolderOpen />
        </IconButton>
      </Link>
    </Tooltip>
  )
}
