import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { GoHorizontalRule } from 'react-icons/go'

export const HorizontalRuleButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Horizontal Rule'
      onClick={() => {
        editor.chain().focus().setHorizontalRule().run()
      }}
    >
      <GoHorizontalRule />
    </MenuButton>
  )
}
