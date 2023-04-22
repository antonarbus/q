
import { ChildrenType } from 'client/types'

type Props = {
  children: ChildrenType
}

export const BoqHeaderSubtotalContainer = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}
