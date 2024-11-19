import { useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { slideElement } from '../utils/slideElement'
import { type Location, useLocation } from 'react-router-dom'
import type { NavigateState } from '@shared/types/NavigateState'

type Props = {
  children: React.ReactNode
  onMount?: () => void
  onUnmount?: () => void
  shouldUnmountOnClickAway: boolean
  shouldUnmountOnEsc?: boolean
}

export const BackdropWithSlidableModal = ({
  children,
  onMount,
  onUnmount,
  shouldUnmountOnClickAway,
  shouldUnmountOnEsc,
}: Props): React.JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null)
  const location = useLocation() as Location<NavigateState>

  const scrollTopPositionBeforeModalOpen = useRef(
    document.documentElement.scrollTop,
  )

  useEffectOnce(() => {
    if (contentRef.current) {
      if (location.state?.shouldSlide) {
        slideElement({
          intoView: true,
          element: contentRef.current,
          onSlideElementComplete: () => {
            onMount?.()
          },
        })
      } else {
        onMount?.()
      }
    }
  })

  useEffectOnce(() => {
    const closeModalOnEsc = (e: KeyboardEvent): void => {
      if (shouldUnmountOnEsc && contentRef.current) {
        if (e.key === 'Escape') {
          if (location.state?.shouldSlide) {
            slideElement({
              element: contentRef.current,
              onSlideElementComplete: () => {
                onUnmount?.()
              },
            })
          } else {
            onUnmount?.()
          }
        }
      }
    }

    document.addEventListener('keydown', closeModalOnEsc)

    return (): void => {
      document.removeEventListener('keydown', closeModalOnEsc)
    }
  })

  useEffectOnce(() => {
    const disableBackgroundScroll = (): void => {
      const bodyElement = document.querySelector('body')

      if (bodyElement instanceof HTMLElement) {
        // i am not sure how it happened that we use overflow on body and not on html
        // but if use overflow on html then layout shifts when overflow: hidden and scroll disappears
        bodyElement.style.setProperty('overflow', 'hidden')
        bodyElement.scrollTop = scrollTopPositionBeforeModalOpen.current

        document.documentElement.scrollTop =
          scrollTopPositionBeforeModalOpen.current
      }
    }

    const enableBackgroundScroll = (): void => {
      const bodyElement = document.querySelector('body')

      if (bodyElement instanceof HTMLElement) {
        bodyElement.style.removeProperty('overflow')

        document.documentElement.scrollTop =
          scrollTopPositionBeforeModalOpen.current
      }
    }

    disableBackgroundScroll()

    return enableBackgroundScroll
  })

  const unmountOnClickAway = (): void => {
    if (contentRef.current && shouldUnmountOnClickAway) {
      if (location.state?.shouldSlide) {
        slideElement({
          element: contentRef.current,
          onSlideElementComplete: () => {
            onUnmount?.()
          },
        })
      } else {
        onUnmount?.()
      }
    }
  }

  return (
    <div
      onMouseDown={unmountOnClickAway}
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
      <div ref={contentRef}>{children}</div>
    </div>
  )
}
