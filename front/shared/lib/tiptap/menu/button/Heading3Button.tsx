import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiH3 } from 'react-icons/ri'

export const Heading3Button = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('heading', { level: 3 })
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Heading 3'
      onClick={() => {
        editor.chain().focus().toggleHeading({ level: 3 }).run()
      }}
    >
      <RiH3 size={16} />
    </MenuButton>
  )
}
