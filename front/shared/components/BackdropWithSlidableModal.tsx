import { useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { useSlide } from '../utils/useSlide'
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
  const { ref: contentRef, slideIn, slideOut } = useSlide()
  const location = useLocation() as Location<NavigateState>

  const scrollTopPositionBeforeModalOpen = useRef(
    document.documentElement.scrollTop,
  )

  useEffectOnce(() => {
    if (location.state?.shouldSlide) {
      const slideInAndSomeAction = async (): Promise<void> => {
        await slideIn()
        onMount?.()
      }

      void slideInAndSomeAction()
    } else {
      onMount?.()
    }
  })

  useEffectOnce(() => {
    const closeModalOnEsc = (e: KeyboardEvent): void => {
      if (shouldUnmountOnEsc && e.key === 'Escape') {
        if (location.state?.shouldSlide) {
          const slideOutAndSomeAction = async (): Promise<void> => {
            await slideOut()
            onUnmount?.()
          }

          void slideOutAndSomeAction()
        } else {
          onUnmount?.()
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
    if (shouldUnmountOnClickAway) {
      if (location.state?.shouldSlide) {
        const slideOutAndSomeAction = async (): Promise<void> => {
          await slideOut()
          onUnmount?.()
        }

        void slideOutAndSomeAction()
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
