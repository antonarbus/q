import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiH4 } from 'react-icons/ri'

export const Heading4Button = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) =>
    ctx.editor.isActive('heading', { level: 4 }),
  )

  return (
    <MenuButton
      isActive={isActive}
      title='Heading 4'
      onClick={() => {
        editor.chain().focus().toggleHeading({ level: 4 }).run()
      }}
    >
      <RiH4 />
    </MenuButton>
  )
}
