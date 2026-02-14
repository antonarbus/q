import type { JSX } from 'react'
import type { Editor, EditorEvents } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import type { EditorRef } from '@shared/lib/tiptap/types'
import { type CSSObject, Box } from '@mui/material'
import { cls } from '@shared/cls'
import { StaticHtml } from './StaticHtml'
import { TiptapEditor } from './TiptapEditor'
import { UploadButton } from './menu/button/UploadButton'
import { DropHereText } from './DropHereText'
import { tiptapStyles } from './style/tiptapStyles'

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
  if (props.isEditorActive === false) {
    return (
      <StaticHtml
        className={props.className}
        content={props.content}
        placeholder={props.placeholder}
        sx={props.sx}
      />
    )
  }

  return (
    <Box
      className={`${props.className} ${props.onUpload === undefined ? '' : cls.droppable}`}
      onClick={props.onWrapperClick}
      onFocus={props.onWrapperFocus}
      sx={{
        position: 'relative',
        ...tiptapStyles,
        ...props.sx,
      }}
    >
      {props.onUpload !== undefined && (
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
      {props.onUpload !== undefined && <DropHereText />}
      <TiptapEditor
        editorRef={props.editorRef}
        placeholder={props.placeholder}
        content={props.content}
        onCreate={props.onCreate}
        onUpdate={props.onUpdate}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
        onUpload={props.onUpload}
      />
    </Box>
  )
}
