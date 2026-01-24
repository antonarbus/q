import type { Editor } from '@tiptap/react'
import { getBoqBlockFromStore } from '../redux/getter/getBoqBlockFromStore'
import type { HeaderKey } from '@back/entity/quotation/schema'

type Props = {
  editor: Editor
  blockIndex: number
  boqHeaderKey: HeaderKey
}

// froala has a bug, on first render it always thinks that content is changed
// https://github.com/froala/wysiwyg-editor/issues/3022

export const didBoqHeaderContentChange = (props: Props): boolean => {
  const htmlOnDisplay = props.editor.getHTML()

  const htmlFromStore = getBoqBlockFromStore({ blockIndex: props.blockIndex })
    ?.boq.header[props.boqHeaderKey].html

  const didContentChange = htmlOnDisplay !== htmlFromStore

  return didContentChange
}
