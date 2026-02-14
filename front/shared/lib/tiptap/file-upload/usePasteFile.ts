import type { EditorView } from '@tiptap/pm/view'
import { useTiptap } from '../provider/TiptapProvider'

type OnPaste = (_view: EditorView, event: ClipboardEvent) => boolean

export const usePasteFile = (): OnPaste => {
  const tiptap = useTiptap()

  const onPaste: OnPaste = (_view, event) => {
    const pastedFiles = event.clipboardData?.files

    const hasFiles = pastedFiles !== undefined && pastedFiles.length > 0

    if (hasFiles === false) {
      return false
    }

    if (tiptap.editorRef.current === null) {
      return false
    }

    const [file] = pastedFiles

    if (file === undefined) {
      return false
    }

    void tiptap.onUpload?.({
      editor: tiptap.editorRef.current,
      files: Array.from(pastedFiles),
      type: file.type.startsWith('image/') ? 'image' : 'file',
    })

    return true
  }

  return onPaste
}
