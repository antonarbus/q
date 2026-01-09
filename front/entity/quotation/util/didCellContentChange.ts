import type { FroalaEditor } from '@shared/lib/froala/froala'
import type { CellKey } from '@back/entity/quotation/schema'
import { getCellFromStore } from '../redux/getter/getCellFromStore'

type Props = {
  editor: FroalaEditor
  blockIndex: number
  rowIndex: number
  cellKey: CellKey
}

// froala has a bug, on first render it always thinks that content is changed
// https://github.com/froala/wysiwyg-editor/issues/3022

export const didCellContentChange = (props: Props): boolean => {
  const htmlOnDisplay = props.editor.html.get()

  const htmlFromStore = getCellFromStore({
    blockIndex: props.blockIndex,
    rowIndex: props.rowIndex,
    cellKey: props.cellKey,
  })?.html

  const didContentChange = htmlOnDisplay !== htmlFromStore

  return didContentChange
}
