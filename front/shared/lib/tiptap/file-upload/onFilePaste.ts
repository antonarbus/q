import type { EditorView } from '@tiptap/pm/view'
import type { EditorRef, OnUpload } from '../types'

type Props = {
  editorRef: EditorRef
  onUpload?: OnUpload
}

type OnPaste = (_view: EditorView, event: ClipboardEvent) => boolean

export const onFilePaste = (props: Props): OnPaste => {
  const onPaste: OnPaste = (_view, event) => {
    const pastedFiles = event.clipboardData?.files

    const hasFiles = pastedFiles !== undefined && pastedFiles.length > 0

    if (hasFiles === false) {
      return false
    }

    if (props.editorRef.current === null) {
      return false
    }

    const [file] = pastedFiles

    if (file === undefined) {
      return false
    }

    void props.onUpload?.({
      editor: props.editorRef.current,
      files: Array.from(pastedFiles),
      type: file.type.startsWith('image/') ? 'image' : 'file',
    })

    return true
  }

  return onPaste
}
