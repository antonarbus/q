import type { Editor } from '@tiptap/react'

export type EditorRef = {
  current: Editor | null
}

export type OnUpload = (props: {
  editor: Editor | null
  type: 'image' | 'file'
  files: File[]
}) => Promise<void>
