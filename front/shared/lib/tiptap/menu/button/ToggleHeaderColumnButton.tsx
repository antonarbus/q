import { useTiptap } from '@tiptap/react'
import { TbTableColumn } from 'react-icons/tb'
import { MenuButton } from './shared/MenuButton'

export const ToggleHeaderColumnButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Toggle header column'
      onClick={() => {
        editor.chain().focus().toggleHeaderColumn().run()
      }}
    >
      <TbTableColumn />
    </MenuButton>
  )
}
