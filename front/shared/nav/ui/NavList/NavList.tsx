import { useSelector } from '@shared/lib/redux'
import type { JSX } from 'react'
import { useWindowSize } from 'react-use'
import { navMediaQuery } from '../navMediaQuery'
import { NavItem } from './NavItem'

export const NavList = (): JSX.Element => {
  const navStructure = useSelector((state) => state.nav.navStructure)
  const { width } = useWindowSize()

  const isMobile = width < navMediaQuery.widthWhenNothingFits

  const navStructureToLoad =
    isMobile === true ? navStructure : navStructure[0]?.navItems

  const nonHiddenNavItems = navStructureToLoad
    ?.filter((navItem) => navItem.isHidden === false)
    .map((navItem) => <NavItem key={navItem.id} navItem={navItem} />)

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
