import { type ReactNode, useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { slideElement } from '../utils/slideElement'
import { type Location, useLocation } from 'react-router-dom'
import type { NavigateState } from '@shared/types/NavigateState'

type Props = {
  children: ReactNode
  onMount?: () => void
  onUnmount?: () => void
  shouldCloseOnClickAway?: boolean
  shouldCloseOnEsc?: boolean
}

export const BackdropWithSlidableModal = ({
  children,
  onMount,
  onUnmount,
  shouldCloseOnClickAway = true,
  shouldCloseOnEsc = true,
}: Props): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null)
  const location = useLocation() as Location<NavigateState>

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
      if (shouldCloseOnEsc && contentRef.current) {
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
        bodyElement.style.overflow = 'hidden'
      }
    }

    const enableBackgroundScroll = (): void => {
      const bodyElement = document.querySelector('body')

      if (bodyElement instanceof HTMLElement) {
        bodyElement.style.overflow = 'auto'
      }
    }

    disableBackgroundScroll()

    return enableBackgroundScroll
  })

  const closeOnClickAway = (): void => {
    if (contentRef.current && shouldCloseOnClickAway) {
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
      onMouseDown={closeOnClickAway}
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
