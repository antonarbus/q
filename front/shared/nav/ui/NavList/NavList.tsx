import { useSelector } from '@shared/lib/redux'
import { NavItem } from './NavItem'
import { Burger } from './NavItem/Burger'

export const NavList = (): React.JSX.Element => {
  const navStructure = useSelector((state) => state.nav.navStructure)

  const navItems = navStructure[0]?.menuItems
    ?.filter((navItem) => !navItem.isHidden)
    .map((navItem) => (
      <NavItem
        id={navItem.id}
        key={navItem.id}
      />
    ))

  return (
    <ul
      style={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingLeft: '0px',
        paddingRight: '0px',
      }}
    >
      {navItems}
      <NavItem
        id={'burger'}
        key={'burger'}
      >
        <Burger />
      </NavItem>
    </ul>
  )
}
