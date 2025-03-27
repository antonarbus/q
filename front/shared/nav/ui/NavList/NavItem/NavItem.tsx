import { useSelector } from '@shared/lib/redux'
import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { clickOnNavItem } from './clickOnNavItem'
import { Menu } from './Menu'
import { NavName } from './NavName'
import { NavItemLayout } from './NavItemLayout'
import type { NavItemId } from '@shared/consts/navItemId'
import { ArrowForNestedMenu } from './ArrowForNestedMenu'
import { IconWithLoader } from './IconWithLoader'

type Props = {
  children?: React.ReactNode
  navItemId: NavItemId
}

export const NavItem = ({ children, navItemId }: Props): React.JSX.Element => {
  const location = useLocation()
  // required to avoid Menu to go over the narrow window
  const navItemRef = useRef<React.ComponentRef<'li'> | null>(null)

  // needs to open only menu under clicked navItem, otherwise multiple menus are opened under all navItems
  const shouldOpenThisMenu = useSelector(
    (state) => state.nav.idsToCurrentMenuItems.at(1) === navItemId,
  )

  const navItem = useSelector((state) => {
    const topNavLevel = state.nav.navStructure[0]

    if (topNavLevel === undefined) {
      return undefined
    }

    if (topNavLevel.menuItems === undefined) {
      return undefined
    }

    const navItemFromTopNavLevel = topNavLevel.menuItems.find(
      (menuItem) => menuItem.id === navItemId,
    )

    return navItemFromTopNavLevel
  })

  const name = navItem?.name
  const link = navItem?.link ?? ''
  const isFunc = Boolean(navItem?.func)
  const isLoading = navItem?.isLoading
  const isSuccess = navItem?.isSuccess
  const isError = navItem?.isError
  const disabled = Boolean(navItem?.disabled)
  const isActive = Boolean(navItem?.isActive)

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

          if (isLoading || isSuccess || isError || disabled) {
            e.preventDefault()

            return
          }

          clickOnNavItem({ e, navItem, id: navItemId, navItemRef, disabled })
        }}
        css={{
          position: 'relative',
        }}
      >
        <IconWithLoader navItem={navItem} />
        <NavName name={name} />
        <ArrowForNestedMenu navItem={navItem} />
        {children}
      </Link>
      {shouldOpenThisMenu && <Menu />}
    </NavItemLayout>
  )
}
