import type { TNavItem } from 'client/entities/nav'
import { NavItem } from './NavItem'
import { Burger } from './NavItem/Burger'
import { useSelectorTyped } from 'client/shared/hooks'

export function NavList(): React.ReactNode {
  const navStructure = useSelectorTyped((state) => state.nav.navStructure)

  if (navStructure[0] === undefined) return null

  return (
    <ul
      css={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
      }}
    >
      {navStructure[0]
        .menuItems?.filter((navItem) => !navItem.isHidden)
        .map((navItem: TNavItem) => (
          <NavItem id={navItem.id} key={navItem.id} />
        ))}
      <NavItem id={'burger'} key={'burger'}>
        <Burger />
      </NavItem>
    </ul>
  )
}
