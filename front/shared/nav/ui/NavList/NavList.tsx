import { useSelector } from '@shared/lib/redux'
import { NavItem } from './NavItem'
import { useWindowSize } from 'react-use'
import { navMediaQuery } from '../navMediaQuery'

export const NavList = (): React.JSX.Element => {
  const navStructure = useSelector((state) => state.nav.navStructure)
  const { width } = useWindowSize()

  const isMobile = width < navMediaQuery.widthWhenNothingFits

  const navStructureToLoad =
    isMobile === true ? navStructure : navStructure[0]?.navItems

  const nonHiddenNavItems = navStructureToLoad
    ?.filter((navItem) => navItem.isHidden === false)
    .map((navItem) => (
      <NavItem
        navItem={navItem}
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
      {nonHiddenNavItems}
    </ul>
  )
}
