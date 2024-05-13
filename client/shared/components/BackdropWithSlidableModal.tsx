import { type ReactNode, useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { slideElement } from '../utils/slideElement'

type Props = {
  children: ReactNode
  color?: string
  onSlideModalInComplete?: () => void
  onSlideModalOutComplete?: () => void
  shouldSlideIn?: boolean
  clickAway?: boolean
}

export const BackdropWithSlidableModal = ({
  children,
  onSlideModalInComplete,
  onSlideModalOutComplete,
  shouldSlideIn = true,
  clickAway = true,
}: Props): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffectOnce(() => {
    if (contentRef.current && shouldSlideIn) {
      slideElement({
        intoView: true,
        element: contentRef.current,
        onSlideElementComplete: () => {
          onSlideModalInComplete?.()
        },
      })
    }
  })

  useEffectOnce(() => {
    if (!clickAway) return

    const slideAway = (e: KeyboardEvent): void => {
      if (!contentRef.current) return

      if (e.key === 'Escape') {
        slideElement({
          element: contentRef.current,
          onSlideElementComplete: () => {
            onSlideModalOutComplete?.()
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
        if (contentRef.current && clickAway) {
          slideElement({
            element: contentRef.current,
            onSlideElementComplete: () => {
              onSlideModalOutComplete?.()
            },
          })
        }
      }}
      style={{
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
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  )
}
