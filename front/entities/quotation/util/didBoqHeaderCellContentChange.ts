import type { FroalaEditor } from '@shared/lib/froala/froala'
import { getBoqBlockFromStore } from '../redux/getter/getBoqBlockFromStore'
import type { HeaderKey } from '../type'

type Props = {
  editor: FroalaEditor
  blockIndex: number
  boqHeaderKey: HeaderKey
}

// froala has a bug, on first render it always thinks that content is changed
// https://github.com/froala/wysiwyg-editor/issues/3022

export const didBoqHeaderCellContentChange = ({
  editor,
  blockIndex,
  boqHeaderKey,
}: Props): boolean => {
  const htmlOnDisplay = editor.html.get()

  const htmlFromStore = getBoqBlockFromStore({ blockIndex })?.boq.header[
    boqHeaderKey
  ].html

  const didContentChange = htmlOnDisplay !== htmlFromStore

  return didContentChange
}
