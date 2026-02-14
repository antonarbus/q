import { type JSX, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu } from './menu/FloatingMenu'
import { ImageMenu } from './menu/ImageMenu'
import { useExtensions } from './extension/useExtensions'
import { cls } from '@shared/cls'
import { useDropFile } from './file-upload/useDropFile'
import { usePasteFile } from './file-upload/usePasteFile'
import { useTiptap } from './provider/TiptapProvider'

export const TiptapEditor = (): JSX.Element => {
  const ctx = useTiptap()
  const extensions = useExtensions()
  const dropFile = useDropFile()
  const pasteFile = usePasteFile()

  const editor = useEditor(
    {
      extensions,
      content: ctx.content,
      onCreate: ctx.onCreate,
      onUpdate: ctx.onUpdate,
      onBlur: ctx.onBlur,
      editorProps: {
        handleKeyDown: (view, event) => {
          if (ctx.onKeyDown !== undefined) {
            return ctx.onKeyDown(view, event)
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
    ctx.editorRef.current = editor

    return (): void => {
      ctx.editorRef.current = null
    }
  }, [editor, ctx.editorRef])

  return (
    <>
      <FloatingMenu editor={editor} />
      <ImageMenu editor={editor} />
      <EditorContent
        editor={editor}
        className={cls.tipTapEditor}
        style={{ flexGrow: 1 }}
      />
    </>
  )
}
