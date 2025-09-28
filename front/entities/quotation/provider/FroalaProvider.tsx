import {
  createContext,
  useContext,
  useMemo,
  type JSX,
  type ReactNode,
  type RefObject,
} from 'react'
import type { FroalaProps } from '../ui/froala/types'
// import type { FroalaProps } from '../ui/froala/Froala'

type Context = FroalaProps & {
  froalaElementRef: RefObject<HTMLDivElement | null>
  froalaHeightRef: RefObject<number>
}

type Props = Context & {
  children: ReactNode
}

const FroalaContext = createContext<Context | null>(null)

export const FroalaProvider = (props: Props): JSX.Element => {
  const froalaContextValue = useMemo(() => {
    return {
      editorRef: props.editorRef,
      placeholder: props.placeholder,
      htmlGetter: props.htmlGetter,
      style: props.style,
      sx: props.sx,
      onContentChange: props.onContentChange,
      onFocus: props.onFocus,
      onClick: props.onClick,
      onBlur: props.onBlur,
      onKeydown: props.onKeydown,
      onInitialized: props.onInitialized,
      froalaElementRef: props.froalaElementRef,
      froalaHeightRef: props.froalaHeightRef,
      beforeUpload: props.beforeUpload,
    }
  }, [props])

  return (
    <FroalaContext.Provider value={froalaContextValue}>
      {props.children}
    </FroalaContext.Provider>
  )
}

export const useFroala = (): Context => {
  const context = useContext(FroalaContext)

  if (context === null) {
    throw new Error('useFroala must be used within a FroalaProvider')
  }

  return context
}
