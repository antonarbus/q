import { css } from '@emotion/react'
import { FiLoader } from 'react-icons/fi'

type Props = {
  style?: React.CSSProperties
}

export const RotatingLoaderIcon = (props: Props): React.JSX.Element => {
  return (
    <FiLoader
      css={css`
        animation: rotate 1.5s linear infinite;
        @keyframes rotate {
          to {
            transform: rotate(360deg);
          }
        }
      `}
      data-testid='spinner icon'
      style={props.style}
    />
  )
}
