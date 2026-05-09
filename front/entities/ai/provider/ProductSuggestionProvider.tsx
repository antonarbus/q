import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import { useProductSuggestionMutation } from '../api/useProductSuggestionMutation'

type ContextValue = {
  inputValue: string
  setInputValue: (value: string) => void
  mutation: ReturnType<typeof useProductSuggestionMutation>
}

const ProductSuggestionContext = createContext<ContextValue | null>(null)

type Props = {
  children: ReactNode
}

export const ProductSuggestionProvider = (props: Props): React.JSX.Element => {
  const [inputValue, setInputValue] = useState('')
  const mutation = useProductSuggestionMutation()

  return (
    <ProductSuggestionContext.Provider value={{ inputValue, setInputValue, mutation }}>
      {props.children}
    </ProductSuggestionContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components
export const useProductSuggestion = (): ContextValue => {
  const context = useContext(ProductSuggestionContext)

  if (context === null) {
    throw new Error('useProductSuggestion must be used within ProductSuggestionProvider')
  }

  return context
}
