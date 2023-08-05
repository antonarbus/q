import { useIsPasteHere } from './useIsPasteHere'
import type { ReactNode } from 'react'

interface Props {
  index: number
  children: ReactNode
}

export const ReduceOpacityIfPasteHere = ({ children, index }: Props) => {
  const isPasteHere = useIsPasteHere({ index })

  return (
    <div
      className='reduce-opacity-if-paste-here'
      style={{ opacity: isPasteHere ? 0.2 : 1 }}
    >
      {children}
    </div>
  )
}
