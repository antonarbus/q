import { createContext, useContext, useMemo } from 'react'
import type { EditorEvents } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import type { OnUpload } from '../types'
import type { CSSObject } from '@mui/material'
import type { RegistryKey } from '../editorRegistry'

type Props = {
  registryKey: RegistryKey
  placeholder: string
  contentGetter: () => string
  className: string
  sx: CSSObject
  onCreate?: (props: EditorEvents['create']) => void
  onChange: (props: EditorEvents['update']) => void
  onFocusOut?: (props: EditorEvents['blur']) => void
  onKeyDown?: (view: EditorView, event: KeyboardEvent) => boolean
  onWrapperClick?: (event: React.MouseEvent) => void
  onWrapperFocus?: (event: React.FocusEvent) => void
  onUpload?: OnUpload
  children: React.ReactNode
}

type Res = Omit<Props, 'children'>

const TiptapContext: React.Context<Res | null> = createContext<Res | null>(null)

export const TiptapProvider = (props: Props): React.JSX.Element => {
  const value = useMemo(() => {
    return {
      registryKey: props.registryKey,
      placeholder: props.placeholder,
      contentGetter: props.contentGetter,
      className: props.className,
      sx: props.sx,
      onCreate: props.onCreate,
      onChange: props.onChange,
      onFocusOut: props.onFocusOut,
      onKeyDown: props.onKeyDown,
      onWrapperClick: props.onWrapperClick,
      onWrapperFocus: props.onWrapperFocus,
      onUpload: props.onUpload,
    }
  }, [props])

  return (
    <TiptapContext.Provider value={value}>
      {props.children}
    </TiptapContext.Provider>
  )
}

export const useTiptapCtx = (): Res => {
  const context = useContext(TiptapContext)

  if (context === null) {
    throw new Error('useTiptapCtx must be used within a TiptapProvider')
  }

  return context
}
