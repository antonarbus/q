import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiListUnordered } from 'react-icons/ri'

export const BulletListButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('bulletList')
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Bullet List'
      onClick={() => {
        editor.chain().focus().toggleBulletList().run()
      }}
    >
      <RiListUnordered />
    </MenuButton>
  )
}
