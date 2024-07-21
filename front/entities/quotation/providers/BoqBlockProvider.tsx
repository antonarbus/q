import { createContext, useContext, type ReactNode } from 'react'
import type { FroalaEditorRef } from '@shared/types/froala'
import type { BoqRowEditorRefs } from '../types'

type Props = {
  children: ReactNode
}

export type BoqBlockContextType = {
  subTotalPriceEditorRef: FroalaEditorRef
  boqRowEditorRefs: BoqRowEditorRefs
}

const BoqBlockContext = createContext<BoqBlockContextType | null>(null)

export const BoqItemProvider = ({ children }: Props): JSX.Element => {
  return (
    <BoqBlockContext.Provider
      value={{
        subTotalPriceEditorRef: { current: null },
        boqRowEditorRefs: [],
      }}
    >
      {children}
    </BoqBlockContext.Provider>
  )
}

export const useBoqBlock = (): BoqBlockContextType => {
  const context = useContext(BoqBlockContext)

  if (!context) {
    throw new Error('useBoqBlock must be used within a BoqBlockProvider')
  }

  return context
}
