import type FroalaEditor from 'froala-editor'
import { createContext, useContext, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export type BoqItemContextType = {
  subTotalPriceEditorRef: { current: FroalaEditor | null }
  boqRowEditorRefs: Array<{
    description: { current: FroalaEditor | null }
    itemPrice: { current: FroalaEditor | null }
    qty: { current: FroalaEditor | null }
    price: { current: FroalaEditor | null }
  }>
}

const BoqItemContext = createContext<BoqItemContextType | null>(null)

export const BoqItemProvider = ({
  children,
}: Props): JSX.Element => {
  return (
    <BoqItemContext.Provider
      value={{
        subTotalPriceEditorRef: { current: null },
        boqRowEditorRefs: [],
      }}
    >
      {children}
    </BoqItemContext.Provider >
  )
}

export const useBoqItem = (): BoqItemContextType => {
  const context = useContext(BoqItemContext)

  if (!context) {
    throw new Error('useBoqItem must be used within a BoqItemProvider')
  }

  return context
}
