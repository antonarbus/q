import type { FroalaEditorRef } from '@shared/lib/froala/froala'
import {
  type Context,
  createContext,
  type JSX,
  type ReactNode,
  useContext,
  useMemo,
} from 'react'
import type { RowEditorRefs } from '../ref/rowEditorRefs'
import type { EditorRef } from '@shared/lib/tiptap/types'

type Props = {
  children: ReactNode
}

type Res = {
  subTotalPriceEditorRef: EditorRef
  rowEditorRefs: RowEditorRefs
}

const BoqContext: Context<Res | null> = createContext<Res | null>(null)

export const BoqProvider = (props: Props): JSX.Element => {
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
