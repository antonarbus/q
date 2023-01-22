import styled from '@emotion/styled'
import { MenuType } from '../navStructure'
import { NavItem } from './NavItem'
import { Burger } from './NavItem/Burger'
import { useSelectorTyped as useSelector } from 'client/store'

export function NavList() {
  const { navStructure } = useSelector(state => state.nav)

  return (
    <Ul>
      {
        navStructure[0].menuItems!
          .filter((navItem) => !navItem.isHidden)
          .map((navItem: MenuType) => <NavItem id={navItem.id} key={navItem.id} />)
      }
      <NavItem id={'burger'} key={'burger'}><Burger /></NavItem>
    </Ul>
  )
}

const Ul = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`
