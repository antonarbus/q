import { type ReactNode, useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { slideElement } from '../utils/slideElement'

type Props = {
  children: ReactNode
  color?: string
  onOpen?: () => void
  onClose?: () => void
  shouldSlide?: boolean
  clickAway?: boolean
  shouldCloseOnEsc?: boolean
}

export const BackdropWithSlidableModal = ({
  children,
  onOpen,
  onClose,
  shouldSlide = true,
  clickAway = true,
  shouldCloseOnEsc = true,
}: Props): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffectOnce(() => {
    if (contentRef.current) {
      if (shouldSlide) {
        slideElement({
          intoView: true,
          element: contentRef.current,
          onSlideElementComplete: () => {
            onOpen?.()
          },
        })
      } else {
        onOpen?.()
      }
    }
  })

  useEffectOnce(() => {
    const closeModalOnEsc = (e: KeyboardEvent): void => {
      if (shouldCloseOnEsc && contentRef.current) {
        if (e.key === 'Escape') {
          if (shouldSlide) {
            slideElement({
              element: contentRef.current,
              onSlideElementComplete: () => {
                onClose?.()
              },
            })
          } else {
            onClose?.()
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
    if (contentRef.current && clickAway) {
      if (shouldSlide) {
        slideElement({
          element: contentRef.current,
          onSlideElementComplete: () => {
            onClose?.()
          },
        })
      } else {
        onClose?.()
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
