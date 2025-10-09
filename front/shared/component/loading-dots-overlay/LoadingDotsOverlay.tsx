import { useSelector } from '@shared/lib/redux'
import type { JSX } from 'react'
import { LoadingDots } from './LoadingDots'

type Props = {
  shouldShowLoader: boolean
  text: string | null
}

export const LoadingDotsOverlay = (props: Props): JSX.Element | null => {
  const loadingOverlay = useSelector((state) => state.app.loadingOverlay)

  const notLoading =
    loadingOverlay.shouldShowLoader === false &&
    props.shouldShowLoader === false

  if (notLoading === true) {
    return null
  }

  const getText = (): string => {
    if (loadingOverlay.text !== null) {
      return loadingOverlay.text
    }

    if (props.text !== null) {
      return props.text
    }

    return ''
  }

  const text = getText()

  const getShouldShowLoader = (): boolean => {
    if (loadingOverlay.shouldShowLoader === true) {
      return true
    }

    if (props.shouldShowLoader === true) {
      return true
    }

    return false
  }

  const shouldShowLoader = getShouldShowLoader()

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3vw',
        color: '#fff',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.5)',
        WebkitTapHighlightColor: 'transparent',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        style={{
          color: '#d4d4d4',
          fontSize: '2rem',
          fontWeight: 300,
          position: 'relative',
          top: '-60px',
          height: '60px',
        }}
      >
        {text}
      </div>
      {shouldShowLoader === true && <LoadingDots />}
    </div>
  )
}
