import { IconButton } from '@mui/material'
import type { ReactNode } from 'react'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import type { QuotationLocationState } from '.'

type Props = {
  id: string
}

export const OpenQuotationPageAndLoadFromServerButton = ({
  id,
}: Props): ReactNode => {
  const state: QuotationLocationState = {
    quotationType: 'server',
  }

  return (
    <Link
      to={`/${id}`}
      state={state}
    >
      <IconButton size='small'>
        <AiOutlineFolderOpen />
      </IconButton>
    </Link>
  )
}
