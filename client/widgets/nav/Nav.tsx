import { useRef } from 'react'
import { useSelectorTyped } from '@shared/hooks'
import { theme } from '@shared/clients'
import { Logo } from './Logo'
import { NavList } from './NavList'
import { useMenuItemActionShortcuts } from './functions/useMenuItemActionShortcuts'
import { useMediaQueryValues } from './functions/useMediaQueryValues'

export const Nav = (): JSX.Element => {
  const navRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const mediaQueryWidth = useSelectorTyped(state => state.nav.mediaQueryWidth)
  const mediaEnabled = useSelectorTyped(state => state.nav.mediaEnabled)
  useMenuItemActionShortcuts()
  useMediaQueryValues({ navRef, logoRef })

  return (
    <nav
      ref={navRef}
      css={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        position: 'sticky',
        top: '5px',
        // marginTop: theme.nav.marginTop + 'px',
        marginBottom: theme.nav.marginBottom + 'px',
        marginLeft: '10px',
        marginRight: '10px',
        height: theme.nav.height + 'px',
        borderRadius: '4px',
        background: theme.colors.darkBackground,
        boxShadow: '0 0px 5px 0 #0000005c',
        zIndex: 2,
        contain: 'layout inline-size',
        fontWeight: 300,
        '& > ul > li > a > .icon-round-wrapper': mediaEnabled && {
          [`@media (max-width: ${mediaQueryWidth.icon}px) and (min-width: ${mediaQueryWidth.name}px)`]:
          {
            display: 'none',
          },
          [`@media (max-width: ${mediaQueryWidth.burger}px)`]: {
            display: 'none',
          },
        },
        '& .nav-item-name': mediaEnabled && {
          [`@media (max-width: ${mediaQueryWidth.name}px)`]: {
            display: 'none',
          },
        },
        '& li:not(:last-child)': mediaEnabled && {
          [`@media (max-width: ${mediaQueryWidth.burger}px)`]: {
            display: 'none',
          },
        },
        '& li:last-child': {
          display: 'none',
          [`@media (max-width: ${mediaQueryWidth.burger}px)`]: mediaEnabled && {
            display: 'flex',
          },
        },
      }}
    >
      <Logo logoRef={logoRef} />
      <NavList />
    </nav>
  )
}
