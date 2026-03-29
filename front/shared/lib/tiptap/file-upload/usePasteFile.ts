import type { EditorView } from '@tiptap/pm/view'
import { useTiptapCtx } from '../provider/TiptapProvider'
import { editorRegistry } from '../editorRegistry'

type OnPaste = (_view: EditorView, event: ClipboardEvent) => boolean

export const usePasteFile = (): OnPaste => {
  const tiptapCtx = useTiptapCtx()

  const onPaste: OnPaste = (_view, event) => {
    const pastedFiles = event.clipboardData?.files

    const hasFiles = pastedFiles !== undefined && pastedFiles.length > 0

    if (hasFiles === false) {
      return false
    }

    const editorInstance = editorRegistry.get(tiptapCtx.registryKey) ?? null

    if (editorInstance === null) {
      return false
    }

    const [file] = pastedFiles

    if (file === undefined) {
      return false
    }

    tiptapCtx.onUpload?.({
      editor: editorInstance,
      files: [...pastedFiles],
      type: file.type.startsWith('image/') ? 'image' : 'file',
    })

    return true
  }

  return onPaste
}
