import { theme } from 'client/theme'
import { TChildren, TRefDiv } from 'client/types'
import { useRef } from 'react'
import { useEffectOnce } from 'react-use'

type TProps = {
  height: number | string | undefined
  children: TChildren
}

//* we have slide-in item animation after paste
//* height is animated from 0 to 'auto'
//* if item children not initiated yet or not available immediately or smth
//* then auto height will be smaller then it should be
//* we will see height jump when height is calculated
//* to avoid it we save item height value in redux
//* we wrap our item content into this wrapper which at the beginning has height from redux
//* and we remove it when animation is supposed to finnish, in 0.5s
//* do not 'setTimeout' approach, but let it be for now
//* we maybe can use onAnimationComplete callback from framer-motion, but need to find a way to pass it, not sure

// todo: move FixHeightBeforePasteAnimation in common folder to the
// todo: itemRef is not actually an .item, it is somewhere inside, check that
// todo: instead of set item heights in default object, let's put them on init load and then they will be saved in local storage

export const FixHeightBeforePasteAnimation = ({ height, children }: TProps) => {
  const ref = useRef() as TRefDiv
  const delayMs = 1000 * theme.item.animationDuration

  useEffectOnce(() => {
    if (!height) return
    setTimeout(() => {
      ref.current.style.removeProperty('height')
    }, delayMs)
  })

  return (
    <div
      ref={ref}
      style={{ height, width: '100%' }}
      className='fix-height-for-element-animation'
    >
      {children}
    </div>
  )
}
