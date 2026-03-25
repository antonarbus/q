import { reduxHolder } from '@front/shared/lib/redux'
import { useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { useAnimatedElement } from '../util/useAnimatedElement'

type Props = {
  children: React.ReactNode
  onMount?: () => void
  onUnmount?: (() => void) | undefined
  shouldUnmountOnClickAway: boolean
  shouldUnmountOnEsc?: boolean
}

export const BackdropWithSlidableModal = (props: Props): React.JSX.Element => {
  const animatedElement = useAnimatedElement()

  const scrollTopPositionBeforeModalOpen = useRef(
    document.documentElement.scrollTop,
  )

  useEffectOnce(() => {
    if (reduxHolder.getState().app.navigateState.shouldSlide === true) {
      const slideInAndSomeAction = async (): Promise<void> => {
        await animatedElement.slideIn()
        props.onMount?.()
      }

      void slideInAndSomeAction()
    } else {
      props.onMount?.()
    }
  })

  useEffectOnce(() => {
    const closeModalOnEsc = (event: KeyboardEvent): void => {
      const shouldCloseModalOnEsc =
        props.shouldUnmountOnEsc === true && event.key === 'Escape'

      if (shouldCloseModalOnEsc === true) {
        if (reduxHolder.getState().app.navigateState.shouldSlide === true) {
          const slideOutAndSomeAction = async (): Promise<void> => {
            await animatedElement.slideOut()
            props.onUnmount?.()
          }

          void slideOutAndSomeAction()
        } else {
          props.onUnmount?.()
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
    if (props.shouldUnmountOnClickAway === true) {
      if (reduxHolder.getState().app.navigateState.shouldSlide === true) {
        const slideOutAndSomeAction = async (): Promise<void> => {
          await animatedElement.slideOut()
          props.onUnmount?.()
        }

        void slideOutAndSomeAction()
      } else {
        props.onUnmount?.()
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
        background: 'rgba(0, 0, 0, 0.1)',
        WebkitTapHighlightColor: 'transparent',
        zIndex: 1000,
      }}
    >
      <div ref={animatedElement.ref}>{props.children}</div>
    </div>
  )
}
