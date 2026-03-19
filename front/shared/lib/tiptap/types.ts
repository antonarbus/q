import type { Editor } from '@tiptap/react'

export type OnUpload = (props: {
  editor: Editor | null
  type: 'image' | 'file'
  files: File[]
}) => Promise<void>
