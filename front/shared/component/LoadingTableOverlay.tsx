import { useSelector } from '@shared/lib/redux'
import { LoadingDots } from './loading_dots_overlay/LoadingDots'

export const LoadingTableOverlay = (): React.JSX.Element | null => {
  const loadingOverlay = useSelector((state) => state.agGrid.loadingOverlay)

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
        {loadingOverlay.text}
      </div>
      {loadingOverlay.showLoader === true ? (
        <LoadingDots background='grey' />
      ) : null}
    </div>
  )
}
