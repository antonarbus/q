import styled from '@emotion/styled'
import { capitalizeKey } from './function/capitalizeKey'

type PropsForSC = {
  $isHovered: boolean
}

const Span = styled.span<PropsForSC>`
  display: ${(props): 'block' | 'none' =>
    props.$isHovered ? 'block' : 'none'};
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 10px;
  font-weight: 300;
  color: #a5a4a4;
`

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
    <Span
      className='shortcut'
      $isHovered={$isHovered}
    >
      {capitalizeKey(keys)}
    </Span>
  )
}
