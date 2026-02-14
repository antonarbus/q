import { useTiptap, useTiptapState } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiListCheck3 } from 'react-icons/ri'

export const TaskListButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  const isActive = useTiptapState((ctx) => {
    return ctx.editor.isActive('taskList')
  })

  return (
    <MenuButton
      isActive={isActive}
      title='Task List'
      onClick={() => {
        editor.chain().focus().toggleTaskList().run()
      }}
    >
      <RiListCheck3 />
    </MenuButton>
  )
}
