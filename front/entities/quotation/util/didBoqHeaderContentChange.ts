import type { FroalaEditor } from '@shared/lib/froala/froala'
import { getBoqBlockFromStore } from '../redux/getter/getBoqBlockFromStore'
import type { HeaderKey } from '@back/entities/quotation/quotationSchema'

type Props = {
  editor: FroalaEditor
  blockIndex: number
  boqHeaderKey: HeaderKey
}

// froala has a bug, on first render it always thinks that content is changed
// https://github.com/froala/wysiwyg-editor/issues/3022

export const didBoqHeaderContentChange = (props: Props): boolean => {
  const htmlOnDisplay = props.editor.html.get()

  const htmlFromStore = getBoqBlockFromStore({ blockIndex: props.blockIndex })
    ?.boq.header[props.boqHeaderKey].html

  const didContentChange = htmlOnDisplay !== htmlFromStore

  return didContentChange
}
