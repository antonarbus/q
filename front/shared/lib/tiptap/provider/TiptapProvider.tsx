import {
  type Context,
  createContext,
  type JSX,
  type ReactNode,
  useContext,
  useMemo,
} from 'react'
import type { EditorEvents } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import type { EditorRef, OnUpload } from '../types'

type Props = {
  editorRef: EditorRef
  placeholder: string
  content: string
  onCreate?: (props: EditorEvents['create']) => void
  onUpdate: (props: EditorEvents['update']) => void
  onBlur?: (props: EditorEvents['blur']) => void
  onKeyDown?: (view: EditorView, event: KeyboardEvent) => boolean
  onUpload?: OnUpload
  children: ReactNode
}

type Res = Omit<Props, 'children'>

const TiptapContext: Context<Res | null> = createContext<Res | null>(null)

export const TiptapProvider = (props: Props): JSX.Element => {
  const value = useMemo(() => {
    return {
      editorRef: props.editorRef,
      placeholder: props.placeholder,
      content: props.content,
      onCreate: props.onCreate,
      onUpdate: props.onUpdate,
      onBlur: props.onBlur,
      onKeyDown: props.onKeyDown,
      onUpload: props.onUpload,
    }
  }, [
    props.editorRef,
    props.placeholder,
    props.content,
    props.onCreate,
    props.onUpdate,
    props.onBlur,
    props.onKeyDown,
    props.onUpload,
  ])

  return (
    <TiptapContext.Provider value={value}>
      {props.children}
    </TiptapContext.Provider>
  )
}

export const useTiptap = (): Res => {
  const context = useContext(TiptapContext)

  if (context === null) {
    throw new Error('useTiptap must be used within a TiptapProvider')
  }

  return context
}
