import { createContext, useContext, type ReactNode, useRef, type MutableRefObject } from 'react'
import type FroalaEditor from 'froala-editor'

type Props = {
  children: ReactNode
}

type BoqItemEditorsRef = {
  subTotalEditorRef: {
    current: FroalaEditor | null
  }
}

const BoqEditorsContext = createContext<BoqItemEditorsRef | undefined>(undefined)

export const BoqEditorsContextProvider = ({ children }: Props): JSX.Element => {
  const boqItemEditorsRef: BoqItemEditorsRef = {
    subTotalEditorRef: {
      current: null,
    },
  }

  return (
    <BoqEditorsContext.Provider value={boqItemEditorsRef}>
      {children}
    </BoqEditorsContext.Provider>
  )
}

export const useBoqItemEditors = (): BoqItemEditorsRef => {
  const context = useContext(BoqEditorsContext)

  if (!context) {
    throw new Error('useBoqEditors must be used within a BoqEditorsContextProvider')
  }

  return context
}
