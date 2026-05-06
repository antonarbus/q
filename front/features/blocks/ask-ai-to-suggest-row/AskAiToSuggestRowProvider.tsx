import { createContext, useContext, useState } from 'react'
import { useAiSuggestRowMutation } from '@front/entities/ai/api/useAiSuggestRowMutation'

type ContextValue = {
  inputValue: string
  setInputValue: (value: string) => void
  mutation: ReturnType<typeof useAiSuggestRowMutation>
}

const AskAiToSuggestRowContext = createContext<ContextValue | null>(null)

export const AskAiToSuggestRowProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element => {
  const [inputValue, setInputValue] = useState('')
  const mutation = useAiSuggestRowMutation()

  return (
    <AskAiToSuggestRowContext.Provider value={{ inputValue, setInputValue, mutation }}>
      {children}
    </AskAiToSuggestRowContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components
export const useAiSuggestRow = (): ContextValue => {
  const context = useContext(AskAiToSuggestRowContext)

  if (context === null) {
    throw new Error('useAiSuggestRow must be used within AskAiToSuggestRowProvider')
  }

  return context
}
