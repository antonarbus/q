import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiSeparator } from 'react-icons/ri'

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
      <RiSeparator />
    </MenuButton>
  )
}
