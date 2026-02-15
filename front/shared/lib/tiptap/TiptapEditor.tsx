import { useEffect } from 'react'
import { Tiptap, useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu } from './menu/FloatingMenu'
import { ImageMenu } from './menu/ImageMenu'
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

  const editor = useEditor(
    {
      extensions,
      content: tiptapCtx.contentGetter(),
      onCreate: tiptapCtx.onCreate,
      onUpdate: tiptapCtx.onUpdate,
      onBlur: tiptapCtx.onBlur,
      editorProps: {
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

  useEffect(() => {
    tiptapCtx.editorRef.current = editor

    return (): void => {
      tiptapCtx.editorRef.current = null
    }
  }, [editor, tiptapCtx.editorRef])

  return (
    <Tiptap editor={editor}>
      <FloatingMenu />
      <ImageMenu />
      <EditorContent
        editor={editor}
        className={cls.tipTapEditor}
        style={{ flexGrow: 1 }}
      />
    </Tiptap>
  )
}
