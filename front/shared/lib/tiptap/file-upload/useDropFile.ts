import type { Slice } from '@tiptap/pm/model'
import type { EditorView } from '@tiptap/pm/view'
import { useTiptap } from '../provider/TiptapProvider'

type OnDrop = (
  _view: EditorView,
  event: DragEvent,
  _slice: Slice,
  moved: boolean,
) => boolean

export const useDropFile = (): OnDrop => {
  const tiptap = useTiptap()

  const onDrop: OnDrop = (_view, event, _slice, moved) => {
    if (moved === true) {
      return false
    }

    const droppedFiles = event.dataTransfer?.files

    const hasFiles = droppedFiles !== undefined && droppedFiles.length > 0

    if (hasFiles === false) {
      return false
    }

    const editorInstance = tiptap.editorRef.current

    if (editorInstance === null) {
      return false
    }

    event.preventDefault()

    const [file] = droppedFiles

    if (file === undefined) {
      return false
    }

    void tiptap.onUpload?.({
      editor: editorInstance,
      files: Array.from(droppedFiles),
      type: file.type.startsWith('image/') ? 'image' : 'file',
    })

    return true
  }

  return onDrop
}
