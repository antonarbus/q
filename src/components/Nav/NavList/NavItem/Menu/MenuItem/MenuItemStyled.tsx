import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

type PropsForSC = {
  $isHovered: boolean
  to: string
}

export const MenuItemStyled = styled(Link)<PropsForSC>`
  position: relative;
  height: ${props => props.theme.menu.menuItem.height}px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-radius: 8px;
  padding: 0.5rem;
  margin: 0px 16px;
  color: #dadce1;
  white-space: nowrap;
  text-decoration: none;
  background-color: ${props => props.$isHovered ? '#525357' : 'initial'};
  filter: ${props => props.$isHovered ? 'brightness(1.2)' : 'none'};
`
