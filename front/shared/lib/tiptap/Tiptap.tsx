import type { JSX } from 'react'
import type { Editor, EditorEvents } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import type { EditorRef } from '@shared/lib/tiptap/types'
import { type CSSObject, Box } from '@mui/material'
import { cls } from '@shared/cls'
import { StaticHtml } from './StaticHtml'
import { TiptapEditor } from './TiptapEditor'
import { UploadButton } from './UploadButton'
import { DropHereText } from './DropHereText'
import { tiptapStyles } from './tiptapStyles'

// todo: check how image behaves on resize and then save, also resize by container
// some code from Froala

// 'image.loaded'(props: { '0': HTMLImageElement }): void {
//   const imageElement = props['0']
//   imageElement.style.aspectRatio = `${imageElement.clientWidth}/${imageElement.clientHeight}`
//   imageElement.id = `img-${generateId()}`
//   imageElement.classList.add('fr-rounded')
// },

type Props = {
  editorRef: EditorRef
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
    editor: Editor
    type: 'image' | 'file'
    files: File[]
  }) => Promise<void>
  isEditorActive: boolean
}

export const Tiptap = (props: Props): JSX.Element => {
  const hasUpload = props.onUpload !== undefined

  if (props.isEditorActive === false) {
    return (
      <StaticHtml
        className={props.className}
        content={props.content}
        sx={props.sx}
      />
    )
  }

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
            const editorInstance = props.editorRef.current

            if (editorInstance === null) return

            void props.onUpload?.({
              editor: editorInstance,
              files,
              type,
            })
          }}
        />
      )}
      {hasUpload === true && <DropHereText />}
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
