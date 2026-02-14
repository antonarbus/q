import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiH6 } from 'react-icons/ri'

export const Heading6Button = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('heading', { level: 6 })
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Heading 6'
      onClick={() => {
        editor.chain().focus().toggleHeading({ level: 6 }).run()
      }}
    >
      <RiH6 size={16} />
    </MenuButton>
  )
}
