import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiH2 } from 'react-icons/ri'

export const Heading2Button = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('heading', { level: 2 })
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Heading 2'
      onClick={() => {
        editor.chain().focus().toggleHeading({ level: 2 }).run()
      }}
    >
      <RiH2 size={16} />
    </MenuButton>
  )
}
