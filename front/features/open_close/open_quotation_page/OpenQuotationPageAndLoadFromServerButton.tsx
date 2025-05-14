import { IconButton, Tooltip } from '@mui/material'
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
          // todo: do we really need to re-render quotation?
          // todo: Now we most likely need to re-load it again
          // dispatch(appSlice.actions.reRenderQuotation())
        }}
      >
        <IconButton size='small'>
          <AiOutlineFolderOpen />
        </IconButton>
      </Link>
    </Tooltip>
  )
}
