import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { theme } from 'client/shared/clients'

interface Props {
  to: string
  state: {
    isHovered: boolean
  }
}

export const MenuItemStyled = styled(Link)`
  position: relative;
  height: ${theme.menu.menuItem.height}px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-radius: 8px;
  padding: 0.5rem;
  margin: 0px 16px;
  color: #dadce1;
  white-space: nowrap;
  text-decoration: none;
  background-color: ${(props: Props): '#525357' | 'initial' =>
    props.state.isHovered ? '#525357' : 'initial'};
  filter: ${(props: Props): 'brightness(1.2)' | 'none' => (props.state.isHovered ? 'brightness(1.2)' : 'none')};
`
