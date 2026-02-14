import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiAlignCenter } from 'react-icons/ri'

export const AlignCenterButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive({ textAlign: 'center' })
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Align center'
      onClick={() => {
        editor.chain().focus().setTextAlign('center').run()
      }}
    >
      <RiAlignCenter />
    </MenuButton>
  )
}
