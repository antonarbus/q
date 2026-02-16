import { useEffect } from 'react'
import { Tiptap, useEditor } from '@tiptap/react'
import { MenuForTextSelection } from './menu/MenuForTextSelection'
import { MenuForImageSelection } from './menu/MenuForImageSelection'
import { useExtensions } from './extension/useExtensions'
import { cls } from '@shared/cls'
import { useDropFile } from './file-upload/useDropFile'
import { usePasteFile } from './file-upload/usePasteFile'
import { useTiptapCtx } from './provider/TiptapProvider'

export const TiptapEditor = (): React.JSX.Element => {
  const tiptapCtx = useTiptapCtx()
  const extensions = useExtensions()
  const dropFile = useDropFile()
  const pasteFile = usePasteFile()

  // https://tiptap.dev/docs/guides/react-composable-api
  const editor = useEditor(
    {
      extensions,
      content: tiptapCtx.contentGetter(),
      onCreate: tiptapCtx.onCreate,
      onUpdate: tiptapCtx.onUpdate,
      onBlur: tiptapCtx.onBlur,
      editorProps: {
        attributes: {
          class: cls.tiptapEditor,
        },
        handleKeyDown: (view, event) => {
          if (tiptapCtx.onKeyDown !== undefined) {
            return tiptapCtx.onKeyDown(view, event)
          }

          return false
        },
        handleDrop: (_view, event, _slice, moved) => {
          return dropFile(_view, event, _slice, moved)
        },
        handlePaste: (_view, event) => {
          return pasteFile(_view, event)
        },
      },
    },
    [],
  )

  // Set editor instances to refs to let it be controlled from everywhere
  // For ex. modify price on qty change
  useEffect(() => {
    tiptapCtx.editorRef.current = editor

    return (): void => {
      tiptapCtx.editorRef.current = null
    }
  }, [editor, tiptapCtx.editorRef])

  return (
    <Tiptap editor={editor}>
      <MenuForTextSelection />
      <MenuForImageSelection />
      <Tiptap.Content className={cls.tiptapContent} style={{ flexGrow: 1 }} />
    </Tiptap>
  )
}
