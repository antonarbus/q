import styled from '@emotion/styled'
import { capitalizeKey } from './function/capitalizeKey'

type TProps = {
  shortcut: string[]
  $isHovered: boolean
}

export function Shortcut({ shortcut, $isHovered }: TProps) {
  const keys = shortcut.join('+')

  return (
    <Span className='shortcut' $isHovered={$isHovered}>
      {capitalizeKey(keys)}
    </Span>
  )
}

type TPropsForSC = {
  $isHovered: boolean
}

const Span = styled.span<TPropsForSC>`
  display: ${props => props.$isHovered ? 'block' : 'none'};
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 10px;
  font-weight: 300;
  color: #a5a4a4;
`
