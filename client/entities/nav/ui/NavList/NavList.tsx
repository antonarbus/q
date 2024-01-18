import { useSelectorTyped } from '@libras/store'
import { NavItem } from './NavItem'
import { Burger } from './NavItem/Burger'

export const NavList = (): JSX.Element => {
  const navStructure = useSelectorTyped(state => state.nav.navStructure)

  return (
    <ul
      css={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
      }}
    >
      {navStructure[0]?.menuItems?.filter(navItem => !navItem.isHidden).map(navItem => (
        <NavItem id={navItem.id} key={navItem.id} />
      ))}
      <NavItem id={'burger'} key={'burger'}>
        <Burger />
      </NavItem>
    </ul>
  )
}
