import type { Editor } from '@tiptap/react'
import { MenuButton } from './shared/MenuButton'
import { RiTableLine } from 'react-icons/ri'

type Props = {
  editor: Editor
  onDone?: () => void
}

export const InsertTableButton = (props: Props): React.JSX.Element => (
  <MenuButton
    isActive={false}
    title='Insert table'
    onClick={() => {
      props.editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run()

      props.onDone?.()
    }}
  >
    <RiTableLine />
  </MenuButton>
)
