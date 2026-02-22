import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiBold } from 'react-icons/ri'

export const BoldButton = (): React.JSX.Element => {
  const { editor } = useTiptap()
  const isActive = useTiptapState((ctx) => ctx.editor.isActive('bold'))

  return (
    <MenuButton
      isActive={isActive}
      title='Bold'
      onClick={() => {
        editor.chain().focus().toggleBold().run()
      }}
    >
      <RiBold />
    </MenuButton>
  )
}
