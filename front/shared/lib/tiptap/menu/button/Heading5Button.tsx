import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiH5 } from 'react-icons/ri'

export const Heading5Button = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('heading', { level: 5 })
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Heading 5'
      onClick={() => {
        editor.chain().focus().toggleHeading({ level: 5 }).run()
      }}
    >
      <RiH5 />
    </MenuButton>
  )
}
