import { router } from '@lib_instances/Router'
import { IconButton } from '@mui/material'
import { IoIosCloseCircle } from 'react-icons/io'
import { route } from '@shared/consts/route'

export const CloseQuotationsTableButton = (): JSX.Element => {
  return (
    <IconButton
      onClick={() => {
        void router.navigate(route.root)
      }}
      sx={{
        position: 'absolute',
        right: '-16px',
        top: '-22px',
        zIndex: 1,
      }}
    >
      <IoIosCloseCircle />
    </IconButton>
  )
}
