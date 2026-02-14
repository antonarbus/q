import type { EditorView } from '@tiptap/pm/view'
import { useTiptapCtx } from '../provider/TiptapProvider'

type OnPaste = (_view: EditorView, event: ClipboardEvent) => boolean

export const usePasteFile = (): OnPaste => {
  const tiptapCtx = useTiptapCtx()

  const onPaste: OnPaste = (_view, event) => {
    const pastedFiles = event.clipboardData?.files

    const hasFiles = pastedFiles !== undefined && pastedFiles.length > 0

    if (hasFiles === false) {
      return false
    }

    if (tiptapCtx.editorRef.current === null) {
      return false
    }

    const [file] = pastedFiles

    if (file === undefined) {
      return false
    }

    void tiptapCtx.onUpload?.({
      editor: tiptapCtx.editorRef.current,
      files: Array.from(pastedFiles),
      type: file.type.startsWith('image/') ? 'image' : 'file',
    })

    return true
  }

  return onPaste
}
