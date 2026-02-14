import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './MenuButton'
import { RiBold } from 'react-icons/ri'

export const BoldButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    const isBold = ctx.editor.isActive('bold')

    return isBold
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Bold'
      onClick={() => {
        editor.chain().focus().toggleBold().run()
      }}
    >
      <RiBold size={16} />
    </MenuButton>
  )
}
