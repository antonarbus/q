import { keyframes } from '@emotion/react'

const bounceLoading = keyframes`
  to {
    opacity: 0.3;
    transform: translate3d(0, -1.5rem, 0);
  }
`

type Props = {
  size?: string
  margin?: string
  background?: string
  duration?: string
  dots?: number
}

export const LoadingDots = ({
  size,
  margin,
  background,
  duration,
  dots,
}: Props): React.JSX.Element => (
  <div
    style={{
      display: 'inline-flex',
      justifyContent: 'center',
    }}
  >
    {Array(dots ?? 3)
      .fill('')
      .map((dot, index) => (
        <span
          css={{
            width: size ?? '1.5rem',
            height: size ?? '1.5rem',
            margin: `0 ${margin ?? '1rem'}`,
            background: background ?? '#fff',
            borderRadius: '50%',
            animation: `${
              duration ?? '0.8s'
            } ${bounceLoading} infinite alternate`,
            '&:nth-of-type(2n + 0)': { animationDelay: '0.3s' },
            '&:nth-of-type(3n + 0)': { animationDelay: '0.6s' },
          }}
          key={`dot-${String(index)}`}
        />
      ))}
  </div>
)
