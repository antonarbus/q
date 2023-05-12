import { theme } from 'client/theme'
import { TChildren, TRefDiv } from 'client/types'
import { useRef } from 'react'
import { useEffectOnce } from 'react-use'

type TProps = {
  height: number | string | undefined
  children: TChildren
}

//* we have slide-in item animation after paste
//* item height is animated from 0 to 'auto'
//* if item's children not initiated by Froala or AG-grid yet or not available immediately or smth
//* then height 'auto' will be smaller then it should be
//* we will see height jump when height is calculated
//* to avoid it we save an item height value in redux
//* we wrap our item content into this wrapper which at the beginning has fixed height from redux
//* and we remove fixed height when animation is supposed to finnish, in 0.5s
//* do not like 'setTimeout' approach, but let it be for now
//* we probably can use onAnimationComplete callback from 'framer-motion', but need to find a way to pass it, not sure

// todo: move FixHeightBeforePasteAnimation in common folder to the
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
