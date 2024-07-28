import { IconButton } from '@mui/material'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import type { QuotationLocationState } from '.'

type Props = {
  id: string
}

export const OpenQuotationPageAndLoadFromServerButton = ({
  id,
}: Props): React.ReactNode => {
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
