import { TChildren } from 'client/types'
import { useIsPasteHere } from './useIsPasteHere'

type TProps = {
  index: number
  children: TChildren
}

export const ReduceOpacityIfPasteHere = ({ children, index }: TProps) => {
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
