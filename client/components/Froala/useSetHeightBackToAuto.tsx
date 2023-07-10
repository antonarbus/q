import { theme } from 'client/theme'
import { TRefDiv } from 'client/types'
import { useEffectOnce } from 'react-use'

type TProps = {
  froalaElementRef: TRefDiv
}

export function useSetHeightBackToAuto({ froalaElementRef }: TProps) {
  useEffectOnce(() => {
    setTimeout(() => {
      froalaElementRef.current.style.removeProperty('height')
    }, 1000 * theme.item.animationDuration + 500)
  })
}
