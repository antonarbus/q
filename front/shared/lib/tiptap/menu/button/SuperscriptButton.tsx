import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiSuperscript } from 'react-icons/ri'

export const SuperscriptButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('superscript')
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Superscript'
      onClick={() => {
        editor.chain().focus().toggleSuperscript().run()
      }}
    >
      <RiSuperscript />
    </MenuButton>
  )
}
