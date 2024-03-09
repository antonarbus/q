import { css } from '@emotion/react'
import { FiLoader } from 'react-icons/fi'

export const RotatingLoaderIcon = (): JSX.Element => {
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
    />
  )
}
