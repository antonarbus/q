import { css } from '@emotion/react'
import { getState, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import type { MouseEvent, MutableRefObject } from 'react'
import { useRef } from 'react'
import { TiArrowSortedDown } from 'react-icons/ti'
import { Link, useLocation } from 'react-router-dom'
import { useWindowSize } from 'react-use'
import { clickOnNavItem } from './clickOnNavItem'
import { ErrorIcon } from './ErrorIcon'
import { Icon } from './Icon'
import { Menu } from './Menu'
import { SpinnerIcon } from './SpinnerIcon'
import { SuccessIcon } from './SuccessIcon'

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

export const NavItem = ({ children, id }: Props): JSX.Element => {
  const location = useLocation()
  // required to avoid Menu to go over the narrow window
  const navItemRef = useRef() as MutableRefObject<HTMLLIElement>

  /**
   * - with media query at some width we hide names and show icons
   * - if icon is not provided in navStructure we may generate it dynamically
   * - do it only for such width when only icons are show
   * - for that reason we track window's width with 'useWindowSize' hook
  */
  const windowWidth = useWindowSize().width
  const widthWhenIconsAreShown = getState().nav.mediaQueryWidth.icon
  const shouldDisplayIcon = windowWidth < widthWhenIconsAreShown

  // needs to open only menu under clicked navItem, otherwise multiple menus are opened under all navItems
  const shouldOpenThisMenu = useSelectorTyped(state => state.nav.idsToCurrentMenuItems.at(1) === id)

  const navItem = useSelectorTyped(state => {
    const topNavLevel = state.nav.navStructure[0]
    if (topNavLevel === undefined) return undefined
    if (topNavLevel.menuItems === undefined) return undefined
    return topNavLevel.menuItems.find(menuItem => menuItem.id === id)
  })

  const isNestedMenu = !!navItem?.menuItems
  const icon = navItem?.icon
  const name = navItem?.name
  const link = navItem?.link
  const isFunc = Boolean(navItem?.func)
  const isLoading = navItem?.isLoading
  const isSuccess = navItem?.isSuccess
  const isError = navItem?.isError
  const disabled = Boolean(navItem?.disabled)

  let to = ''

  if (link?.includes('.')) {
    to = (location.pathname + '/' + link).replace('.', '').replace('//', '/').replace('//', '/')
  } else {
    to = link ?? ''
  }

  return (
    <li
      ref={navItemRef}
      className='nav-item'
      css={css`
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        padding: 0px 5px;
        margin-left: ${theme.menu.navItem.marginLeft}px;
        margin-right: ${theme.menu.navItem.marginRight}px;
        user-select: none;

        & > a {
          display: flex;
          align-items: center;
          position: relative;
          text-decoration: none;
          -webkit-user-drag: none;
          cursor: ${disabled ? 'default' : 'pointer'};

          &:hover,
          &:focus,
          &:active {
            filter: brightness(${disabled ? 1 : 1.2});
          }

          .nav-item-name {
            margin-left: 5px;
            margin-right: 5px;
            color: ${disabled ? '#585858' : theme.colors.greyFont};
            white-space: nowrap;
          }

          .arrow-for-nested-menu {
            display: none;
            position: absolute;
            top: calc(50% + 2px);
            transform: translateY(-50%);
            right: -12px;
            color: grey;
            height: 14px;
          }

          &:hover > .arrow-for-nested-menu,
          &:focus > .arrow-for-nested-menu {
            display: block;
          }
        }

        @media screen and (max-width: 480px) {
          position: static;
        }
      `}
    >
      <Link
        to={to}
        onClick={(e: MouseEvent): void => {
          if (isFunc) {
            e.preventDefault()
          }
          if (isLoading) return
          if (isSuccess) return
          if (isError) return
          if (disabled) {
            e.preventDefault()
            return
          }
          clickOnNavItem({ e, navItem, id, navItemRef, disabled })
        }}
        // onMouseEnter={() => {
        //   console.log({ link, to, pathname: location.pathname })
        // }}
      >
        {icon && isLoading && <SpinnerIcon />}
        {icon && isSuccess && <SuccessIcon /> }
        {icon && isError && <ErrorIcon /> }
        {icon && !isLoading && !isSuccess && !isError && <Icon icon={icon} disabled={disabled} />}
        {!icon && shouldDisplayIcon && <Icon icon={name?.[0]} disabled={disabled} />}
        {name && <span className='nav-item-name'>{name}</span>}
        {isNestedMenu && !disabled && <TiArrowSortedDown className='arrow-for-nested-menu' />}
        {children}
      </Link>
      {shouldOpenThisMenu && <Menu />}
    </li>
  )
}
