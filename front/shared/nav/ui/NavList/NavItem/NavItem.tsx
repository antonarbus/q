import { useSelector } from '@shared/lib/redux'
import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { clickOnNavItem } from './clickOnNavItem'
import { Menu } from './Menu'
import { NavName } from './NavName'
import { NavItemLayout } from './NavItemLayout'
import { ArrowForNestedMenu } from './ArrowForNestedMenu'
import { IconWithLoader } from './IconWithLoader'
import type { NavItem as NavItemType } from '@shared/nav/type'

type Props = {
  navItem: NavItemType
}

export const NavItem = ({ navItem }: Props): React.JSX.Element => {
  const location = useLocation()
  // required to avoid Menu to go over the narrow window
  const navItemRef = useRef<React.ComponentRef<'li'> | null>(null)

  // needs to open only menu under clicked navItem, otherwise multiple menus are opened under all navItems
  const isMenuOpen = useSelector(
    (state) => state.nav.idsToCurrentMenuItems.at(1) === navItem.id,
  )

  const { name, isLoading, isSuccess, isError } = navItem
  const link = navItem.link ?? ''
  const isFunc = Boolean(navItem.func)
  const disabled = Boolean(navItem.disabled)
  const isActive = Boolean(navItem.isActive)

  const fixedLink = `${location.pathname}/${link}`
    .replace('.', '')
    .replace('//', '/')
    .replace('//', '/')

  const to = link.includes('.') ? fixedLink : link

  return (
    <NavItemLayout
      disabled={disabled}
      isActive={isActive}
      navItemRef={navItemRef}
    >
      <Link
        css={{
          position: 'relative',
        }}
        onClick={(event: React.MouseEvent): void => {
          if (isFunc === true) {
            event.preventDefault()
          }

          const disableClick = isLoading ?? isSuccess ?? isError ?? disabled

          if (disableClick === true) {
            event.preventDefault()

            return
          }

          clickOnNavItem({ event, navItem, navItemRef, disabled })
        }}
        to={to}
      >
        <IconWithLoader navItem={navItem} />
        <NavName name={name} />
        <ArrowForNestedMenu navItem={navItem} />
      </Link>
      {isMenuOpen && <Menu />}
    </NavItemLayout>
  )
}
