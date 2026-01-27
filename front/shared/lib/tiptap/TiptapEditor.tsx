import { type JSX, useEffect } from 'react'
import {
  type Editor,
  type EditorEvents,
  type UseEditorOptions,
  useEditor,
  EditorContent,
} from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { ResizableImage } from './ResizableImage'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { FloatingMenu } from './FloatingMenu'
import { ImageMenu } from './ImageMenu'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  editorRef: EditorRef
  placeholder: string
  content: UseEditorOptions['content']
  onUpdate: (props: EditorEvents['update']) => void
  onCreate?: (props: EditorEvents['create']) => void
  onBlur?: (props: EditorEvents['blur']) => void
  onKeyDown?: (view: EditorView, event: KeyboardEvent) => boolean
  onUpload?: (props: {
    editor: Editor
    files: File[]
    type: 'image' | 'file'
  }) => Promise<void>
}

export const TiptapEditor = (props: Props): JSX.Element => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        TextStyle,
        Color,
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
        ResizableImage.configure({
          allowBase64: true,
          resize: {
            enabled: true,
            directions: ['bottom-right', 'bottom-left'],
            alwaysPreserveAspectRatio: true,
          },
        }),
        Link.configure({ openOnClick: false }),
        Placeholder.configure({ placeholder: props.placeholder }),
      ],
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
        className='tiptap-editor'
        style={{
          flexGrow: 1,
        }}
      />
    </>
  )
}
