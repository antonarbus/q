import { useSelector } from '@shared/lib/redux'
import { NavItem } from './NavItem'
import { Burger } from './NavItem/Burger'

export const NavList = (): React.JSX.Element => {
  const navStructure = useSelector((state) => state.nav.navStructure)

  const navItems = navStructure[0]?.menuItems
    ?.filter((navItem) => !navItem.isHidden)
    .map((navItem) => (
      <NavItem
        navItem={navItem}
        key={navItem.id}
      />
    ))

  const burger = (
    <NavItem
      navItem={{
        id: 'burger',
        name: 'burger',
        isHidden: false,
      }}
      key={'burger'}
    >
      <Burger />
    </NavItem>
  )

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
      {burger}
    </ul>
  )
}
