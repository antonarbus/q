import { IconButton, Tooltip } from '@mui/material'
import type { ReactNode } from 'react'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { Link } from 'react-router-dom'

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
