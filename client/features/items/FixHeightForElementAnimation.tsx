import { theme } from 'client/theme'
import { TChildren, TRefDiv } from 'client/types'
import { useRef } from 'react'
import { useEffectOnce } from 'react-use'

type TProps = {
  height: number
  children: TChildren
}

//* we have slide in item animation after pasting
//* height is animated from 0 to 'auto'
//* if item children not initiated yet or not available immediately
//* then auto height will be smaller then it should be
//* we will see height jump after animation when height is calculated
//* to avoid it we always keep saving item height value
//* we wrap our content into a this wrapper which at the beginning has this height
//* and we remove it after animation is supposed to finnish

//* do not like 'setTimeout', but let it be for now
//* we maybe can use onAnimationComplete callback, but need to find a way to pass it, fuck that

export const FixHeightForElementAnimation = ({ height, children }: TProps) => {
  const ref = useRef() as TRefDiv

  useEffectOnce(() => {
    setTimeout(() => {
      ref.current.style.removeProperty('height')
    }, 1000 * theme.item.animationDuration)
  })

  return (
    <div
      ref={ref}
      style={{ height }}
      className='fixed-height-for-element-animation'
    >
      {children}
    </div>
  )
}
