import { ChildrenType } from 'client/types'
import { useIsPasteHere } from './useIsPasteHere'

type Props = {
  index: number
  children: ChildrenType
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
