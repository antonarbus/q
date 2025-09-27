import { IconButton } from '@mui/material'
import { FaPlus } from 'react-icons/fa6'

export const OpenInsertMenuButton = (): React.ReactNode => {
  return (
    <IconButton
      onClick={() => {
        alert('xxx')
      }}
    >
      <FaPlus />
    </IconButton>
  )
}
