import { type FroalaEditor } from '@shared/types/froala'
import { getBoqBlockFromStore } from '../redux/getters/getBoqBlockFromStore'
import { type BoqHeaderKey } from '../types'

type Props = {
  editor: FroalaEditor
  itemIndex: number
  boqHeaderKey: BoqHeaderKey
}

// froala has a bug, on first render it always thinks that content is changed
// https://github.com/froala/wysiwyg-editor/issues/3022

export const didBoqHeaderCellContentChange = ({
  editor,
  itemIndex,
  boqHeaderKey,
}: Props): boolean => {
  const htmlOnDisplay = editor.html.get()
  const htmlFromStore = getBoqBlockFromStore({ itemIndex })?.boq.header[
    boqHeaderKey
  ].html
  const didContentChange = htmlOnDisplay !== htmlFromStore
  return didContentChange
}
