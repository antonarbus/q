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
      navItemRef={navItemRef}
      disabled={disabled}
      isActive={isActive}
    >
      <Link
        to={to}
        onClick={(e: React.MouseEvent): void => {
          if (isFunc) {
            e.preventDefault()
          }

          const disableClick = isLoading ?? isSuccess ?? isError ?? disabled

          if (disableClick) {
            e.preventDefault()

            return
          }

          clickOnNavItem({ e, navItem, navItemRef, disabled })
        }}
        css={{
          position: 'relative',
        }}
      >
        <IconWithLoader navItem={navItem} />
        <NavName name={name} />
        <ArrowForNestedMenu navItem={navItem} />
      </Link>
      {isMenuOpen && <Menu />}
    </NavItemLayout>
  )
}
