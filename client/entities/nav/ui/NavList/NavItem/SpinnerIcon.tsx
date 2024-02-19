import { css } from '@emotion/react'
import { FiLoader } from 'react-icons/fi'
import { Icon } from './Icon'

export const SpinnerIcon = (): JSX.Element => {
  return (
    <Icon
      icon={(
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
      )}
      // disabled={true}
    />
  )
}
