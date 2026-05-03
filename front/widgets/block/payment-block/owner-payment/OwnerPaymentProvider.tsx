import { createContext, useContext, useState } from 'react'
import type { Dispatch, JSX, ReactNode, SetStateAction } from 'react'

type Context = {
  amountError: boolean
  setAmountError: Dispatch<SetStateAction<boolean>>
}

type Props = {
  children: ReactNode
}

const OwnerPaymentContext = createContext<Context | null>(null)

export const OwnerPaymentProvider = (props: Props): JSX.Element => {
  const [amountError, setAmountError] = useState(false)

  return (
    <OwnerPaymentContext.Provider
      // oxlint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        amountError,
        setAmountError,
      }}
    >
      {props.children}
    </OwnerPaymentContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components
export const useOwnerPayment = (): Context => {
  const context = useContext(OwnerPaymentContext)

  if (!context) {
    throw new Error('useOwnerPayment must be used within a OwnerPaymentProvider')
  }

  return context
}
