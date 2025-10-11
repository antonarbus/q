import type { FroalaEditor } from '@shared/lib/froala/froala'
import type { BoqRowCellKey } from '../const/boqRowCellKey'
import { getBoqCellFromStore } from '../redux/getter/getBoqCellFromStore'

type Props = {
  editor: FroalaEditor
  blockIndex: number
  rowIndex: number
  boqRowCellKey: BoqRowCellKey
}

// froala has a bug, on first render it always thinks that content is changed
// https://github.com/froala/wysiwyg-editor/issues/3022

export const didBoqCellContentChange = ({
  editor,
  blockIndex,
  rowIndex,
  boqRowCellKey,
}: Props): boolean => {
  const htmlOnDisplay = editor.html.get()

  const htmlFromStore = getBoqCellFromStore({
    blockIndex,
    rowIndex,
    boqRowCellKey,
  })?.html

  const didContentChange = htmlOnDisplay !== htmlFromStore

  return didContentChange
}
