import { theme } from 'client/theme'
import { TChildren, TRefDiv } from 'client/types'
import { useEffect, useRef } from 'react'

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

type TProps = {
  height: number | string | undefined
  children: TChildren
}

export const FixHeightDuringAnimation = ({ height, children }: TProps) => {
  const ref = useRef() as TRefDiv
  // const delayMs = 1000 * theme.item.animationDuration

  // useEffect(function removeFixedHeightAfterAnimation() {
  //   if (!height) return
  //   setTimeout(() => {
  //     ref.current.style.removeProperty('height')
  //   }, delayMs)
  // })

  return (
    <div
      ref={ref}
      style={{ height: height || 'auto' }}
      className='fix-height-for-element-animation'
      onFocus={() => {
        ref.current.style.removeProperty('height')
      }}
    >
      {children}
    </div>
  )
}
