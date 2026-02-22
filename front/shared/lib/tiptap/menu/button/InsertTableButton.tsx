import { useTiptap } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { CiViewTable } from 'react-icons/ci'

export const InsertTableButton = (): React.JSX.Element => {
  const { editor } = useTiptap()

  return (
    <MenuButton
      isActive={false}
      title='Insert table'
      onClick={() => {
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run()
      }}
    >
      <CiViewTable />
    </MenuButton>
  )
}
