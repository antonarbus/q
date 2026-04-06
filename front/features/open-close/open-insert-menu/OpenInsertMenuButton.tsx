import { navItemId } from '@front/entities/nav/navItemId'
import { navSlice } from '@front/entities/nav/navSlice'
import { Box, IconButton } from '@mui/material'
import { cls } from '@front/shared/cls'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { FaPlus } from 'react-icons/fa6'
import { useIsEditorView } from '@front/entities/quotation/util/useIsEditorView'

export const OpenInsertMenuButton = (): React.ReactNode => {
  const isEditorView = useIsEditorView()

  if (isEditorView === false) {
    return null
  }

  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <IconButton
        className={cls.openInsertMenuButton}
        onClick={() => {
          reduxHolder.dispatch(navSlice.actions.openMenuWithId({ navItemId: navItemId.insert }))
        }}
      >
        <FaPlus />
      </IconButton>
    </Box>
  )
}
