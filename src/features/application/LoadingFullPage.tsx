import { LoadingDots } from '@src/common_components/LoadingDots'

type Props = {
  title?: string
}

export const LoadingFullPage = ({ title }: Props) => (
  <div css={{
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
    backdropFilter: 'blur(2px)'
  }}>
    <div
      css={{
        color: '#d4d4d4',
        fontSize: '2rem',
        fontWeight: 300,
        position: 'relative',
        top: '-60px'
      }}
    >
      {title}
    </div>
    <LoadingDots />
  </div>
)
