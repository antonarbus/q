import { theme } from 'client/theme'
import { TRefDiv } from 'client/types'
import { useEffectOnce } from 'react-use'

type TProps = {
  froalaElementRef: TRefDiv
}

export function useSetHeightBackToAuto({ froalaElementRef }: TProps) {
  useEffectOnce(() => {
    setTimeout(() => {
      // todo: now it acts weirdly
      // todo: on animation completion go up and remove height for all froala elements
      froalaElementRef.current.style.removeProperty('height')
    }, 1000 * theme.item.animationDuration + 500)
  })
}
