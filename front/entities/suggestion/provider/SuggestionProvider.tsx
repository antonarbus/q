import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import { useSuggestionMutation } from '../api/useSuggestionMutation'

type ContextValue = {
  inputValue: string
  setInputValue: (value: string) => void
  mutation: ReturnType<typeof useSuggestionMutation>
}

const SuggestionContext = createContext<ContextValue | null>(null)

type Props = {
  children: ReactNode
}

export const SuggestionProvider = (props: Props): React.JSX.Element => {
  const [inputValue, setInputValue] = useState('')
  const mutation = useSuggestionMutation()

  return (
    <SuggestionContext.Provider value={{ inputValue, setInputValue, mutation }}>
      {props.children}
    </SuggestionContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components
export const useSuggestion = (): ContextValue => {
  const context = useContext(SuggestionContext)

  if (context === null) {
    throw new Error('useSuggestion must be used within SuggestionProvider')
  }

  return context
}
