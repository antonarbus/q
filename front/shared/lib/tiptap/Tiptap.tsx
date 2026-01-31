import { type JSX, useEffect } from 'react'
import {
  type Editor,
  type EditorEvents,
  useEditor,
  EditorContent,
} from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import type { EditorRef } from '@shared/lib/tiptap/types'
import { type CSSObject, Box } from '@mui/material'
import { cls } from '@shared/cls'
import { UploadButton } from './UploadButton'
import { DropHereText } from './DropHereText'
import { tiptapStyles } from './tiptapStyles'
import Placeholder from '@tiptap/extension-placeholder'
import { FloatingMenu } from './FloatingMenu'
import { ImageMenu } from './ImageMenu'
import { extensions } from './extensions'

type Props = {
  editorRef: EditorRef
  isEditorActive: boolean
  className: string
  placeholder: string
  sx: CSSObject
  content: string
  onCreate?: (props: EditorEvents['create']) => void
  onUpdate: (props: EditorEvents['update']) => void
  onBlur?: (props: EditorEvents['blur']) => void
  onKeyDown?: (view: EditorView, event: KeyboardEvent) => boolean
  onWrapperClick?: (event: React.MouseEvent) => void
  onWrapperFocus?: (event: React.FocusEvent) => void
  onUpload?: (props: {
    editor: Editor | null
    type: 'image' | 'file'
    files: File[]
  }) => Promise<void>
}

export const Tiptap = (props: Props): JSX.Element => {
  const hasUpload = props.onUpload !== undefined

  const editor = useEditor(
    {
      editable: props.isEditorActive,
      extensions: [
        ...extensions,
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
    <Box
      className={`${props.className} ${hasUpload === true ? cls.droppable : ''}`}
      onClick={props.onWrapperClick}
      onFocus={props.onWrapperFocus}
      sx={{
        ...tiptapStyles,
        ...props.sx,
        position: 'relative',
      }}
    >
      {hasUpload === true && (
        <UploadButton
          onFileSelect={(files, type) => {
            void props.onUpload?.({
              editor: props.editorRef.current,
              files,
              type,
            })
          }}
        />
      )}
      {hasUpload === true && <DropHereText />}
      <FloatingMenu editor={editor} />
      <ImageMenu editor={editor} />
      <EditorContent
        editor={editor}
        className='tiptap-editor'
        style={{
          flexGrow: 1,
          opacity: props.isEditorActive ? 1 : 0.5,
        }}
      />
    </Box>
  )
}
