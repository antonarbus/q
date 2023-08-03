import { useSelectorTyped } from 'client/shared/hooks'
import { store } from 'client/shared/clients'
import { useRef } from 'react'
import { Icon } from './Icon'
import { Menu } from './Menu'
import { useWindowSize } from 'react-use'
import { Link } from 'react-router-dom'
import { clickOnNavItem } from './clickOnNavItem'
import { TiArrowSortedDown } from 'react-icons/ti'
import { theme } from 'client/shared/clients'
import { css } from '@emotion/react'

interface Props {
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

export function NavItem({ children, id }: Props): JSX.Element {
  // required to avoid Menu to go over the narrow window
  const navItemRef = useRef() as React.MutableRefObject<HTMLLIElement>

  /**
   * - with media query at some width we hide names and show icons
   * - if icon is not provided in navStructure we may generate it dynamically
   * - do it only for such width when only icons are show
   * - for that reason we track window's width with 'useWindowSize' hook
  */
  const windowWidth = useWindowSize().width
  const widthWhenIconsAreShown = store.getState().nav.mediaQueryWidth.icon
  const shouldDisplayIcon = windowWidth < widthWhenIconsAreShown

  // needs to open only menu under clicked navItem, otherwise multiple menus are opened under all navItems
  const shouldOpenThisMenu = useSelectorTyped((state) => state.nav.idsToCurrentMenuItems.at(1) === id)

  const navItem = useSelectorTyped((state) => {
    const topNavLevel = state.nav.navStructure[0]
    if (topNavLevel === undefined) return undefined
    if (topNavLevel.menuItems === undefined) return undefined
    return topNavLevel.menuItems.find((menuItem) => menuItem.id === id)
  })

  const isNestedMenu = !!navItem?.menuItems
  const icon = navItem?.icon
  const name = navItem?.name
  const link = navItem?.link
  const disabled = Boolean(navItem?.disabled)

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
        to={link ?? '/'}
        onClick={(e): void => {
          clickOnNavItem({ e, navItem, id, navItemRef, disabled });
        }}
      >
        {icon && <Icon icon={icon} disabled={disabled} />}
        {!icon && shouldDisplayIcon && (
          <Icon icon={name?.[0]} disabled={disabled} />
        )}
        {name && <span className='nav-item-name'>{name}</span>}
        {isNestedMenu && !disabled && (
          <TiArrowSortedDown className='arrow-for-nested-menu' />
        )}
        {children}
      </Link>
      {shouldOpenThisMenu && <Menu />}
    </li>
  )
}
