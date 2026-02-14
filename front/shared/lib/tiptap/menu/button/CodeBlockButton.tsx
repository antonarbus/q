import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiCodeBoxLine } from 'react-icons/ri'

export const CodeBlockButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('codeBlock')
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Code Block'
      onClick={() => {
        editor.chain().focus().toggleCodeBlock().run()
      }}
    >
      <RiCodeBoxLine />
    </MenuButton>
  )
}
