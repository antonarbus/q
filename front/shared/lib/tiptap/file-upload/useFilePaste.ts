import type { EditorView } from '@tiptap/pm/view'
import { useTiptap } from '../provider/TiptapProvider'

type OnPaste = (_view: EditorView, event: ClipboardEvent) => boolean

export const useFilePaste = (): OnPaste => {
  const ctx = useTiptap()

  const onPaste: OnPaste = (_view, event) => {
    const pastedFiles = event.clipboardData?.files

    const hasFiles = pastedFiles !== undefined && pastedFiles.length > 0

    if (hasFiles === false) {
      return false
    }

    if (ctx.editorRef.current === null) {
      return false
    }

    const [file] = pastedFiles

    if (file === undefined) {
      return false
    }

    void ctx.onUpload?.({
      editor: ctx.editorRef.current,
      files: Array.from(pastedFiles),
      type: file.type.startsWith('image/') ? 'image' : 'file',
    })

    return true
  }

  return onPaste
}
