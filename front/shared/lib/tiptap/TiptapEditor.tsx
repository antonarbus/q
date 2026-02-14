import { type JSX, useEffect } from 'react'
import {
  type Editor,
  type EditorEvents,
  useEditor,
  EditorContent,
} from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import { FloatingMenu } from './menu/FloatingMenu'
import { ImageMenu } from './menu/ImageMenu'
import { useExtensions } from './extension/useExtensions'
import type { EditorRef } from '@shared/lib/tiptap/types'
import { cls } from '@shared/cls'

type Props = {
  editorRef: EditorRef
  placeholder: string
  content: string
  onCreate?: (props: EditorEvents['create']) => void
  onUpdate: (props: EditorEvents['update']) => void
  onBlur?: (props: EditorEvents['blur']) => void
  onKeyDown?: (view: EditorView, event: KeyboardEvent) => boolean
  onUpload?: (props: {
    editor: Editor | null
    type: 'image' | 'file'
    files: File[]
  }) => Promise<void>
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
          if (moved === true) {
            return false
          }

          const droppedFiles = event.dataTransfer?.files

          const hasFiles = droppedFiles !== undefined && droppedFiles.length > 0

          if (hasFiles === false) {
            return false
          }

          const editorInstance = props.editorRef.current

          if (editorInstance === null) {
            return false
          }

          event.preventDefault()

          const [file] = droppedFiles

          if (file === undefined) {
            return false
          }

          void props.onUpload?.({
            editor: editorInstance,
            files: Array.from(droppedFiles),
            type: file.type.startsWith('image/') ? 'image' : 'file',
          })

          return true
        },
        handlePaste: (_view, event) => {
          const pastedFiles = event.clipboardData?.files

          const hasFiles = pastedFiles !== undefined && pastedFiles.length > 0

          if (hasFiles === false) {
            return false
          }

          if (props.editorRef.current === null) {
            return false
          }

          const [file] = pastedFiles

          if (file === undefined) {
            return false
          }

          void props.onUpload?.({
            editor: props.editorRef.current,
            files: Array.from(pastedFiles),
            type: file.type.startsWith('image/') ? 'image' : 'file',
          })

          return true
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
        style={{
          flexGrow: 1,
        }}
      />
    </>
  )
}
