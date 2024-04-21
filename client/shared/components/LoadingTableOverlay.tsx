import { signal } from '@preact/signals-react'
import { LoadingDots } from '../loading_dots_overlay/LoadingDots'

export const loadingTableOverlaySignal = signal({ areJumpingDotsShown: false, text: '' })

export const LoadingTableOverlay = (): JSX.Element | null => {
  return (
    <div
      css={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3vw',
        zIndex: 1000,
      }}
    >
      <div
        css={{
          color: '#d4d4d4',
          fontSize: '2rem',
          fontWeight: 300,
          position: 'relative',
          top: '-60px',
          height: '60px',
        }}
      >
        {loadingTableOverlaySignal.value.text}
      </div>
      {loadingTableOverlaySignal.value.areJumpingDotsShown && <LoadingDots background='grey' />}
    </div>
  )
}
