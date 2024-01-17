import type FroalaEditor from 'froala-editor'
import { createContext, useContext, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type Context = {
  subTotalPriceEditorRef: { current: FroalaEditor | null }
  boqPriceEditorRefs: Array<{ current: FroalaEditor | null }>
}

const BoqItemContext = createContext<Context | null>(null)

export const BoqItemProvider = ({
  children,
}: Props): JSX.Element => {
  return (
    <BoqItemContext.Provider
      value={{
        subTotalPriceEditorRef: { current: null },
        boqPriceEditorRefs: [],
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
