import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiAlignLeft } from 'react-icons/ri'

export const AlignLeftButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive({ textAlign: 'left' })
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Align left'
      onClick={() => {
        editor.chain().focus().setTextAlign('left').run()
      }}
    >
      <RiAlignLeft />
    </MenuButton>
  )
}
