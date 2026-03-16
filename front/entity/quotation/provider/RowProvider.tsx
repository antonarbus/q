import { createContext, useContext, useMemo } from 'react'
import type { RowBlock } from '@back/entity/quotation/schema'

type Props = {
  index: number
  item: RowBlock
  children: React.ReactNode
}

type Res = Omit<Props, 'children'>

const RowContext: React.Context<Res | null> = createContext<Res | null>(null)

export const RowProvider = (props: Props): React.JSX.Element => {
  const rowContextData = useMemo(() => {
    const context = {
      index: props.index,
      item: props.item,
    }

    return context
  }, [props.index, props.item])

  return (
    <RowContext.Provider value={rowContextData}>
      {props.children}
    </RowContext.Provider>
  )
}

export const useRow = (): Res => {
  const context = useContext(RowContext)

  if (context === null) {
    throw new Error('useRow must be used within a RowProvider')
  }

  return context
}
