import type { MenuLevel } from 'client/entities/nav'
import { NavItem } from './NavItem'
import { Burger } from './NavItem/Burger'
import { useSelectorTyped } from 'client/shared/hooks'

export function NavList() {
  const navStructure = useSelectorTyped((state) => state.nav.navStructure)

  return (
    <ul
      css={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
      }}
    >
      {navStructure[0]
        .menuItems!.filter((navItem) => !navItem.isHidden)
        .map((navItem: MenuLevel) => (
          <NavItem id={navItem.id} key={navItem.id} />
        ))}
      <NavItem id={'burger'} key={'burger'}>
        <Burger />
      </NavItem>
    </ul>
  )
}
