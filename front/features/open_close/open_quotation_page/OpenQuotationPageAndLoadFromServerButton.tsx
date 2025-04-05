import { IconButton, Tooltip } from '@mui/material'
import { appSlice } from '@shared/appSlice'
import { dispatch } from '@shared/lib/redux'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { Link } from 'react-router-dom'

type Props = {
  id: string
}

export const OpenQuotationPageAndLoadFromServerButton = ({
  id,
}: Props): React.ReactNode => {
  return (
    <Tooltip
      title='Open'
      placement='bottom'
      enterDelay={500}
      enterNextDelay={500}
    >
      <Link
        to={`/${id}`}
        onClick={() => {
          dispatch(
            appSlice.actions.setQuotationSource({ quotationSource: 'server' }),
          )
        }}
      >
        <IconButton size='small'>
          <AiOutlineFolderOpen />
        </IconButton>
      </Link>
    </Tooltip>
  )
}
