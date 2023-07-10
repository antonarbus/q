import { theme } from 'client/theme'
import { TChildren } from 'client/types'
import { useRef } from 'react'
import { useEffectOnce } from 'react-use'

//* we have slide-in item animation after paste
//* item height is animated from 0 to 'auto'
//* if item's children not initiated by Froala or AG-grid yet or not available immediately or smth
//* then height 'auto' will be smaller then it should be
//* we will see height jump when height is calculated
//* to avoid it we save an item height value in redux
//* we wrap our item content into this wrapper which at the beginning has fixed height from redux
//* and we remove fixed height when we focus on an element

type TProps = {
  height: number | string | undefined
  children: TChildren
}

export const FixHeightDuringAnimation = ({ height, children }: TProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffectOnce(() => {
    setTimeout(() => {
      if (!ref.current) return
      ref.current.style.removeProperty('height')
    }, 1000 * theme.item.animationDuration)
  })

  return (
    <div
      ref={ref}
      style={{ height: height || 'auto' }}
      className='fix-height-for-element-animation'
      onFocus={() => {
        if (!ref.current) return null
        ref.current.style.removeProperty('height')
      }}
    >
      {children}
    </div>
  )
}
