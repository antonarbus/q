import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiAlignRight } from 'react-icons/ri'

export const AlignRightButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive({ textAlign: 'right' })
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Align right'
      onClick={() => {
        editor.chain().focus().setTextAlign('right').run()
      }}
    >
      <RiAlignRight />
    </MenuButton>
  )
}
