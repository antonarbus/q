import { createContext, useContext, type ReactNode } from 'react'
import type FroalaEditor from 'froala-editor'

type Context = {
  subTotalEditorRef: { current: FroalaEditor | null }
}

type Props = Omit<Context, 'subTotalEditorRef'> & {
  children: ReactNode
}

const BoqItemContext = createContext<Context | null>(null)

export const BoqItemProvider = ({
  children,
}: Props): JSX.Element => {
  return (
    <BoqItemContext.Provider
      value={{
        subTotalEditorRef: { current: null },
      }}
    >
      {children}
    </BoqItemContext.Provider >
  )
}

export const useBoqItem = (): Context => {
  const context = useContext(BoqItemContext)

  if (!context) {
    throw new Error('useBoqItem must be used within a BoqItemProvider')
  }

  return context
}
