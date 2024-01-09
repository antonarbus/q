import { type BoqColumnKey } from 'client/shared/types'
import type FroalaEditor from 'froala-editor'
import { getBoqRowCellFromStore } from '../redux/getters/getBoqRowCellFromStore'

type Props = {
  editor: FroalaEditor
  itemIndex: number
  rowIndex: number
  boqColumnKey: BoqColumnKey
}

// froala has a bug, on first render it always thinks that content is changed
// https://github.com/froala/wysiwyg-editor/issues/3022

export const didBoqRowCellContentChange = ({
  editor,
  itemIndex,
  rowIndex,
  boqColumnKey,
}: Props): boolean => {
  const htmlOnDisplay = editor.html.get()
  const htmlFromStore = getBoqRowCellFromStore({ itemIndex, rowIndex, boqColumnKey })?.html
  const didContentChange = htmlOnDisplay !== htmlFromStore
  return didContentChange
}
