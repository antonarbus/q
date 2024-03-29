import { type ReactNode, useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { slideElement } from '../utils/slideElement'

type Props = {
  children: ReactNode
  color?: string
  onSlideIn?: () => void
  onSlideOut?: () => void
  shouldSlideIn?: boolean
  clickAway?: boolean
}

export const BackdropWithSlidableContent = ({
  children,
  onSlideIn,
  onSlideOut,
  shouldSlideIn = true,
  clickAway = true,
}: Props): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffectOnce(() => {
    if (!contentRef.current) return
    if (!shouldSlideIn) return

    slideElement({
      intoView: true,
      element: contentRef.current,
      cb: () => {
        onSlideIn?.()
      },
    })
  })

  useEffectOnce(() => {
    if (!clickAway) return

    const slideAway = (e: KeyboardEvent): void => {
      if (!contentRef.current) return

      if (e.key === 'Escape') {
        slideElement({
          element: contentRef.current,
          cb: () => {
            onSlideOut?.()
          },
        })
      }
    }

    document.addEventListener('keydown', slideAway)

    return () => {
      document.removeEventListener('keydown', slideAway)
    }
  })

  return (
    <div
      onMouseDown={(): void => {
        if (!contentRef.current) return
        if (!clickAway) return

        slideElement({
          element: contentRef.current,
          cb: () => {
            onSlideOut?.()
          },
        })
      }}
      css={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        WebkitTapHighlightColor: 'transparent',
        zIndex: 1000,
      }}
    >
      <div
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  )
}
