import { createContext, useContext } from 'react'
import type { FroalaProps } from '../ui/froala/types'
// import type { FroalaProps } from '../ui/froala/Froala'

type Context = FroalaProps & {
  froalaElementRef: React.RefObject<HTMLDivElement | null>
  froalaHeightRef: React.RefObject<number>
}

type Props = Context & {
  children: React.ReactNode
}

const FroalaContext = createContext<Context | null>(null)

export const FroalaProvider = (props: Props): React.JSX.Element => {
  return (
    <FroalaContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </FroalaContext.Provider>
  )
}

export const useFroala = (): Context => {
  const context = useContext(FroalaContext)

  if (!context) {
    throw new Error('useFroala must be used within a FroalaProvider')
  }

  return context
}
