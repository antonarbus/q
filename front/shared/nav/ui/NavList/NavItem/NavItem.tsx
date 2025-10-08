import { useSelector } from '@shared/lib/redux'
import { useRef, type JSX, type ComponentRef, type MouseEvent } from 'react'
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

export const NavItem = (props: Props): JSX.Element => {
  const location = useLocation()
  // required to avoid Menu to go over the narrow window
  const navItemRef = useRef<ComponentRef<'li'> | null>(null)

  // needs to open only menu under clicked navItem, otherwise multiple menus are opened under all navItems
  const isMenuOpen = useSelector(
    (state) => state.nav.idsToCurrentMenuItems.at(1) === props.navItem.id,
  )

  const link = props.navItem.link ?? ''

  const fixedLink = `${location.pathname}/${link}`
    .replace('.', '')
    .replace('//', '/')
    .replace('//', '/')

  const to = link.includes('.') ? fixedLink : link

  // If externalLink is provided, render regular <a> tag for full page navigation
  if (props.navItem.externalLink !== undefined) {
    return (
      <NavItemLayout
        disabled={props.navItem.disabled === true}
        isActive={props.navItem.isActive === true}
        navItemRef={navItemRef}
      >
        <a
          href={props.navItem.externalLink}
          onClick={(event: MouseEvent): void => {
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur()
            }

            const disableClick =
              props.navItem.isLoading ??
              props.navItem.isSuccess ??
              props.navItem.isError ??
              props.navItem.disabled === true

            if (disableClick === true) {
              event.preventDefault()
            }
          }}
          rel='noopener noreferrer'
          style={{
            position: 'relative',
          }}
          target='_blank'
        >
          <IconWithLoader navItem={props.navItem} />
          <NavName name={props.navItem.name} />
          <ArrowForNestedMenu navItem={props.navItem} />
        </a>
        {isMenuOpen === true ? <Menu /> : null}
      </NavItemLayout>
    )
  }

  // Default: use React Router Link for SPA navigation
  return (
    <NavItemLayout
      disabled={props.navItem.disabled === true}
      isActive={props.navItem.isActive === true}
      navItemRef={navItemRef}
    >
      <Link
        css={{
          position: 'relative',
        }}
        onClick={(event: MouseEvent): void => {
          if (Boolean(props.navItem.func) === true) {
            event.preventDefault()
          }

          const disableClick =
            props.navItem.isLoading ??
            props.navItem.isSuccess ??
            props.navItem.isError ??
            props.navItem.disabled === true

          if (disableClick === true) {
            event.preventDefault()

            return
          }

          clickOnNavItem({
            event,
            navItem: props.navItem,
            navItemRef,
            disabled: props.navItem.disabled === true,
          })
        }}
        to={to}
      >
        <IconWithLoader navItem={props.navItem} />
        <NavName name={props.navItem.name} />
        <ArrowForNestedMenu navItem={props.navItem} />
      </Link>
      {isMenuOpen === true ? <Menu /> : null}
    </NavItemLayout>
  )
}
