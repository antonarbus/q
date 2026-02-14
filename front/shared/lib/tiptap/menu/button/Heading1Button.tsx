import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiH1 } from 'react-icons/ri'

export const Heading1Button = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('heading', { level: 1 })
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Heading 1'
      onClick={() => {
        editor.chain().focus().toggleHeading({ level: 1 }).run()
      }}
    >
      <RiH1 size={16} />
    </MenuButton>
  )
}
