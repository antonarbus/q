import { createContext, useContext } from 'react'
import type { FroalaEditorRef } from '@shared/types/froala'
import type { RowEditorRefs } from '../types'

type Props = {
  children: React.ReactNode
}

type BoqContextType = {
  subTotalPriceEditorRef: FroalaEditorRef
  boqRowEditorRefs: RowEditorRefs
}

const BoqContext = createContext<BoqContextType | null>(null)

export const BoqProvider = ({ children }: Props): React.JSX.Element => {
  return (
    <BoqContext.Provider
      value={{
        subTotalPriceEditorRef: { current: null },
        boqRowEditorRefs: [],
      }}
    >
      {children}
    </BoqContext.Provider>
  )
}

export const useBoq = (): BoqContextType => {
  const context = useContext(BoqContext)

  if (context === null) {
    throw new Error('useBoq must be used within a BoqProvider')
  }

  return context
}
