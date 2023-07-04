import { useRef } from 'react'
import { useSelectorTyped } from 'client/store'
import { theme } from 'client/theme'
import { Logo } from './Logo'
import { NavList } from './NavList'
import { useMenuItemActionShortcuts } from './functions/useMenuItemActionShortcuts'
import { useMediaQueryValues } from './functions/useMediaQueryValues'
import { TRefDiv } from 'client/types'

export function Nav() {
  const navRef = useRef() as TRefDiv
  const logoRef = useRef() as TRefDiv
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
          [`@media (max-width: ${mediaQueryWidth.icon}px) and (min-width: ${mediaQueryWidth.name}px)`]: {
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
      <Logo logoRef={logoRef}/>
      <NavList />
    </nav>
  )
}
