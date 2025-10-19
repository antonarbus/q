import type { FroalaEditor } from '@shared/lib/froala/froala'
import type { CellKey } from '../const/cellKey'
import { getBoqCellFromStore } from '../redux/getter/getBoqCellFromStore'

type Props = {
  editor: FroalaEditor
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

// froala has a bug, on first render it always thinks that content is changed
// https://github.com/froala/wysiwyg-editor/issues/3022

export const didBoqCellContentChange = ({
  editor,
  blockIndex,
  rowIndex,
  cellKey,
}: Props): boolean => {
  const htmlOnDisplay = editor.html.get()

  const htmlFromStore = getBoqCellFromStore({
    blockIndex,
    rowIndex,
    cellKey,
  })?.html

  const didContentChange = htmlOnDisplay !== htmlFromStore

  return didContentChange
}
