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
import { useSelector } from '@shared/lib/redux'
import type { CSSObject } from '@mui/material'

type Props = {
  editorRef: EditorRef
  placeholder: string
  content: string
  className: string
  sx: CSSObject
  onCreate?: (props: EditorEvents['create']) => void
  onUpdate: (props: EditorEvents['update']) => void
  onBlur?: (props: EditorEvents['blur']) => void
  onKeyDown?: (view: EditorView, event: KeyboardEvent) => boolean
  onWrapperClick?: (event: React.MouseEvent) => void
  onWrapperFocus?: (event: React.FocusEvent) => void
  onUpload?: OnUpload
  children: ReactNode
}

type Res = Omit<Props, 'children'> & {
  isEditorActive: boolean
}

const TiptapContext: Context<Res | null> = createContext<Res | null>(null)

export const TiptapProvider = (props: Props): JSX.Element => {
  const isEditorActive = useSelector((state) => state.text.isEditable)

  const value = useMemo(() => {
    return {
      editorRef: props.editorRef,
      isEditorActive,
      placeholder: props.placeholder,
      content: props.content,
      className: props.className,
      sx: props.sx,
      onCreate: props.onCreate,
      onUpdate: props.onUpdate,
      onBlur: props.onBlur,
      onKeyDown: props.onKeyDown,
      onWrapperClick: props.onWrapperClick,
      onWrapperFocus: props.onWrapperFocus,
      onUpload: props.onUpload,
    }
  }, [
    props.editorRef,
    isEditorActive,
    props.placeholder,
    props.content,
    props.className,
    props.sx,
    props.onCreate,
    props.onUpdate,
    props.onBlur,
    props.onKeyDown,
    props.onWrapperClick,
    props.onWrapperFocus,
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
