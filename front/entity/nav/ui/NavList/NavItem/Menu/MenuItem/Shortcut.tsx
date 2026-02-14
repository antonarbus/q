import { css } from '@emotion/react'
import { capitalizeKey } from './function/capitalizeKey'

type Props = {
  shortcut: string[]
  $isHovered: boolean
}

export const Shortcut = (props: Props): React.JSX.Element => {
  const keys = props.shortcut.join('+')

  return (
    <span
      className='shortcut'
      css={css`
        display: ${props.$isHovered === true ? 'block' : 'none'};
        position: absolute;
        right: 10px;
        top: 5px;
        font-size: 10px;
        font-weight: 300;
        color: #a5a4a4;
      `}
    >
      {capitalizeKey(keys)}
    </span>
  )
}
