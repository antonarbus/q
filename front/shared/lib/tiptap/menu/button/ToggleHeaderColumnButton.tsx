import { useTiptap } from '@tiptap/react'
import { Box } from '@mui/material'
import { MenuButton } from './shared/MenuButton'

export const ToggleHeaderColumnButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Toggle header column'
      onClick={() => {
        editor.chain().focus().toggleHeaderColumn().run()
      }}
    >
      <Box
        component='span'
        sx={{ fontSize: 10, fontWeight: 700, lineHeight: 1 }}
      >
        H↕
      </Box>
    </MenuButton>
  )
}
