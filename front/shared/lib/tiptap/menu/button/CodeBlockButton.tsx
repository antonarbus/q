import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { PiCodeBlock } from 'react-icons/pi'

export const CodeBlockButton = (): React.JSX.Element => {
  const { editor } = useTiptap()
  const isActive = useTiptapState((ctx) => ctx.editor.isActive('codeBlock'))

  return (
    <MenuButton
      isActive={isActive}
      title='Code Block'
      onClick={() => {
        editor.chain().focus().toggleCodeBlock().run()
      }}
    >
      <PiCodeBlock />
    </MenuButton>
  )
}
