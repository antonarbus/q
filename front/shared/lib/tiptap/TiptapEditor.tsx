import { type JSX, useEffect } from 'react'
import { type EditorEvents, useEditor, EditorContent } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import { FloatingMenu } from './menu/FloatingMenu'
import { ImageMenu } from './menu/ImageMenu'
import { useExtensions } from './extension/useExtensions'
import type { EditorRef, OnUpload } from '@shared/lib/tiptap/types'
import { cls } from '@shared/cls'
import { onFileDrop } from './file-upload/onFileDrop'
import { onFilePaste } from './file-upload/onFilePaste'

type Props = {
  editorRef: EditorRef
  placeholder: string
  content: string
  onCreate?: (props: EditorEvents['create']) => void
  onUpdate: (props: EditorEvents['update']) => void
  onBlur?: (props: EditorEvents['blur']) => void
  onKeyDown?: (view: EditorView, event: KeyboardEvent) => boolean
  onUpload?: OnUpload
}

export const TiptapEditor = (props: Props): JSX.Element => {
  const extensions = useExtensions({ placeholder: props.placeholder })

  const editor = useEditor(
    {
      extensions,
      content: props.content,
      onCreate: props.onCreate,
      onUpdate: props.onUpdate,
      onBlur: props.onBlur,
      editorProps: {
        handleKeyDown: (view, event) => {
          if (props.onKeyDown !== undefined) {
            return props.onKeyDown(view, event)
          }

          return false
        },
        handleDrop: (_view, event, _slice, moved) => {
          const dropFile = onFileDrop({
            editorRef: props.editorRef,
            onUpload: props.onUpload,
          })

          dropFile(_view, event, _slice, moved)
        },
        handlePaste: (_view, event) => {
          const pastFile = onFilePaste({
            editorRef: props.editorRef,
            onUpload: props.onUpload,
          })

          pastFile(_view, event)
        },
      },
    },
    [],
  )

  useEffect(() => {
    props.editorRef.current = editor

    return (): void => {
      props.editorRef.current = null
    }
  }, [editor, props.editorRef])

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
