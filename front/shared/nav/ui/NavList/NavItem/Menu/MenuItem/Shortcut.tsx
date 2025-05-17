import { capitalizeKey } from './function/capitalizeKey'
import { css } from '@emotion/react'

type Props = {
  shortcut: string[]
  $isHovered: boolean
}

export const Shortcut = ({
  shortcut,
  $isHovered,
}: Props): React.JSX.Element => {
  const keys = shortcut.join('+')

  return (
    <span
      className='shortcut'
      css={css`
        display: ${$isHovered === true ? 'block' : 'none'};
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
