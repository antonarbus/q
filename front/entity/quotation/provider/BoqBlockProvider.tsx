import { createContext, useContext, useMemo } from 'react'
import type { RowEditorRefs } from '../ref/rowEditorRefs'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  children: React.ReactNode
}

type Res = {
  subTotalPriceEditorRef: EditorRef
  rowEditorRefs: RowEditorRefs
}

const BoqContext: React.Context<Res | null> = createContext<Res | null>(null)

export const BoqProvider = (props: Props): React.JSX.Element => {
  const blockContextData = useMemo(() => {
    const contextData = {
      subTotalPriceEditorRef: { current: null },
      rowEditorRefs: [],
    }

    return contextData
  }, [])

  return (
    <BoqContext.Provider value={blockContextData}>
      {props.children}
    </BoqContext.Provider>
  )
}

export const useBoq = (): Res => {
  const context = useContext(BoqContext)

  if (context === null) {
    throw new Error('useBoq must be used within a BoqProvider')
  }

  return context
}
