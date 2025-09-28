import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { JSX } from 'react'
import type { FroalaEditorRef } from '@shared/type/froala'
import type { RowEditorRefs } from '../type'

type Props = {
  children: ReactNode
}

type BoqContextType = {
  subTotalPriceEditorRef: FroalaEditorRef
  boqRowEditorRefs: RowEditorRefs
}

const BoqContext = createContext<BoqContextType | null>(null)

export const BoqProvider = ({ children }: Props): JSX.Element => {
  const blockContextData = useMemo(() => {
    const contextData = {
      subTotalPriceEditorRef: { current: null },
      boqRowEditorRefs: [],
    }

    return contextData
  }, [])

  return (
    <BoqContext.Provider value={blockContextData}>
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
