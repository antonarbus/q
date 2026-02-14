import { type JSX, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu } from './menu/FloatingMenu'
import { ImageMenu } from './menu/ImageMenu'
import { useExtensions } from './extension/useExtensions'
import { cls } from '@shared/cls'
import { useFileDrop } from './file-upload/useFileDrop'
import { useFilePaste } from './file-upload/useFilePaste'
import { useTiptap } from './provider/TiptapProvider'

export const TiptapEditor = (): JSX.Element => {
  const ctx = useTiptap()
  const extensions = useExtensions()
  const handleDrop = useFileDrop()
  const handlePaste = useFilePaste()

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
          return handleDrop(_view, event, _slice, moved)
        },
        handlePaste: (_view, event) => {
          return handlePaste(_view, event)
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
