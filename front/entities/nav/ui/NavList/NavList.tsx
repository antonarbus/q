import { navItemId } from '@front/entities/nav/navItemId'
import { useSelector } from '@front/shared/lib/redux'
import { NavItem } from './NavItem'

export const NavList = (): React.JSX.Element => {
  const navStructure = useSelector((state) => state.nav.navStructure)
  const navMode = useSelector((state) => state.nav.navMode)

  const navStructureToLoad =
    navMode === 'hamburger' ? navStructure : navStructure[0]?.nestedItemList

  const nonHiddenNavItems = navStructureToLoad
    ?.filter(
      (navItem) => navItem.isHidden === false || navItem.id === navItemId.back,
    )
    .map((navItem) => (
      <NavItem
        key={navItem.id}
        navItem={navItem}
        visibility={navItem.isHidden === true ? 'hidden' : 'visible'}
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
