import { useSelector } from '@shared/lib/redux'
import { useRef } from 'react'
import { TiArrowSortedDown } from 'react-icons/ti'
import { Link, useLocation } from 'react-router-dom'
import { clickOnNavItem } from './clickOnNavItem'
import { ErrorIcon } from './ErrorIcon'
import { Icon } from './Icon'
import { Menu } from './Menu'
import { SpinnerIcon } from './SpinnerIcon'
import { SuccessIcon } from './SuccessIcon'
import { NavName } from './NavName'
import { NavItemLayout } from './NavItemLayout'

type Props = {
  children?: React.ReactNode
  id: string
}

/**
 * @descriptions
 * - navItem gets 'menu id' from 'navStructure'
 * - menu is placed under navItem (li)
 * - and we can open corresponding menu on click event
 * - reference to menu item <li> to pass it into menu
 * - needs to calculate how NavItem' is far from the screen to understand how to place Menu
 * - Menu can be placed with style left:0 or right:0
 * - required to avoid Menu to go over the narrow window
 */

export const NavItem = ({ children, id }: Props): React.JSX.Element => {
  const location = useLocation()
  // required to avoid Menu to go over the narrow window
  const navItemRef = useRef<React.ComponentRef<'li'> | null>(null)

  // needs to open only menu under clicked navItem, otherwise multiple menus are opened under all navItems
  const shouldOpenThisMenu = useSelector(
    (state) => state.nav.idsToCurrentMenuItems.at(1) === id,
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
      (menuItem) => menuItem.id === id,
    )

    return navItemFromTopNavLevel
  })

  const isNestedMenu = Boolean(navItem?.menuItems)
  const icon = navItem?.icon
  const name = navItem?.name
  const link = navItem?.link ?? ''
  const isFunc = Boolean(navItem?.func)
  const isLoading = navItem?.isLoading
  const isSuccess = navItem?.isSuccess
  const isError = navItem?.isError
  const disabled = Boolean(navItem?.disabled)
  const isActive = Boolean(navItem?.isActive)
  const tooltipText = navItem?.tooltip

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

          clickOnNavItem({ e, navItem, id, navItemRef, disabled })
        }}
        css={{
          position: 'relative',
        }}
        // onMouseEnter={() => {
        //   console.log({ link, to, pathname: location.pathname })
        // }}
      >
        {icon && isLoading && <SpinnerIcon />}
        {icon && isSuccess && <SuccessIcon />}
        {icon && isError && <ErrorIcon />}
        {icon && !isLoading && !isSuccess && !isError && (
          <Icon
            icon={icon}
            disabled={disabled}
            tooltipText={tooltipText}
          />
        )}
        {!icon && (
          <Icon
            icon={name?.[0]}
            disabled={disabled}
          />
        )}
        <NavName name={name} />
        {isNestedMenu && !disabled && (
          <TiArrowSortedDown className='arrow-for-nested-menu' />
        )}
        {children}
      </Link>
      {shouldOpenThisMenu && <Menu />}
    </NavItemLayout>
  )
}
