import { createContext, useContext, type ReactNode } from 'react'
import { type FroalaEditorRef } from '@shared/types/froala'
import { type BoqRowEditorRefs } from '../types'

type Props = {
  children: ReactNode
}

export type BoqItemContextType = {
  subTotalPriceEditorRef: FroalaEditorRef
  boqRowEditorRefs: BoqRowEditorRefs
}

const BoqItemContext = createContext<BoqItemContextType | null>(null)

export const BoqItemProvider = ({ children }: Props): JSX.Element => {
  return (
    <BoqItemContext.Provider
      value={{
        subTotalPriceEditorRef: { current: null },
        boqRowEditorRefs: [],
      }}
    >
      {children}
    </BoqItemContext.Provider>
  )
}

export const useBoqItem = (): BoqItemContextType => {
  const context = useContext(BoqItemContext)

  if (!context) {
    throw new Error('useBoqItem must be used within a BoqItemProvider')
  }

  return context
}
