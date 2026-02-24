import { useTiptap } from '@tiptap/react'
import { Box } from '@mui/material'
import { MenuButton } from './shared/MenuButton'

export const ToggleHeaderRowButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Toggle header row'
      onClick={() => {
        editor.chain().focus().toggleHeaderRow().run()
      }}
    >
      <Box
        component='span'
        sx={{ fontSize: 10, fontWeight: 700, lineHeight: 1 }}
      >
        H↔
      </Box>
    </MenuButton>
  )
}
