import { css } from '@emotion/react'
import { type CSSProperties } from 'react'
import { FiLoader } from 'react-icons/fi'

type Props = {
  style?: CSSProperties
}

export const RotatingLoaderIcon = ({ style }: Props): JSX.Element => {
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
      style={style}
    />
  )
}
