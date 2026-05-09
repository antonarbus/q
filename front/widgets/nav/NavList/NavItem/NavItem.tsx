import type { NavItem as NavItemType } from '@front/shared/nav/type'
import { reduxHolder } from '@front/shared/lib/redux/reduxHolder'
import { clickOnNavItem } from '@front/widgets/nav/handlers/clickOnNavItem'
import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowForNestedMenu } from './ArrowForNestedMenu'
import { IconWithLoader } from './IconWithLoader'
import { Menu } from './Menu'
import { NavItemLayout } from './NavItemLayout'
import { NavName } from './NavName'

type Props = {
  navItem: NavItemType
  visibility?: 'hidden' | 'visible'
}

export const NavItem = (props: Props): React.JSX.Element => {
  const location = useLocation()

  // required to avoid Menu to go over the narrow window
  const navItemRef = useRef<React.ComponentRef<'li'> | null>(null)

  // needs to open only menu under clicked navItem, otherwise multiple menus are opened under all navItems
  const isMenuOpen = reduxHolder.useSelector(
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
        visibility={props.visibility}
      >
        <a
          href={props.navItem.externalLink}
          onClick={(event: React.MouseEvent): void => {
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
          <NavName maxName={props.navItem.maxName} name={props.navItem.name} />
          <ArrowForNestedMenu navItem={props.navItem} />
        </a>
        {isMenuOpen === true ? <Menu navItemRef={navItemRef} /> : null}
      </NavItemLayout>
    )
  }

  // Default: use React Router Link for SPA navigation
  return (
    <NavItemLayout
      disabled={props.navItem.disabled === true}
      isActive={props.navItem.isActive === true}
      navItemRef={navItemRef}
      visibility={props.visibility}
    >
      <Link
        css={{
          position: 'relative',
        }}
        onClick={(event: React.MouseEvent): void => {
          if (Boolean(props.navItem.funcId) === true) {
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
        <NavName maxName={props.navItem.maxName} name={props.navItem.name} />
        <ArrowForNestedMenu navItem={props.navItem} />
      </Link>
      {isMenuOpen === true ? <Menu navItemRef={navItemRef} /> : null}
    </NavItemLayout>
  )
}
