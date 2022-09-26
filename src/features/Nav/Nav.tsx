import { useLayoutEffect, useRef } from 'react'
import { useDispatchTyped, useSelectorTyped as useSelector } from '@src/store'
import { disableMedia, enableMedia, setNavMediaQueryWidths } from '@features/nav/navSlice'
import { theme } from '@src/theme'
import { useMenuItemActionShortcuts } from './functions/useMenuItemActionShortcuts'
import { calcNavMediaQueryParams } from './functions/calcNavMediaQueryParams'
import { Logo } from './Logo'
import { NavList } from './NavList'
import { useFirstMountState } from 'react-use'

export function Nav() {
  const navRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const logoRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const mediaQueryWidth = useSelector(state => state.nav.mediaQueryWidth)
  const mediaEnabled = useSelector(state => state.nav.mediaEnabled)
  const navStructure = useSelector(state => state.nav.navStructure)
  const isFirstMount = useFirstMountState()
  const dispatch = useDispatchTyped()
  useMenuItemActionShortcuts()

  useLayoutEffect(() => {
    // initial calculation of media query values
    const { logoExtension, logoPart, icon, name, burger } = calcNavMediaQueryParams(navRef.current, logoRef.current)
    dispatch(setNavMediaQueryWidths({ logoExtension, logoPart, icon, name, burger }))
  }, [])

  useLayoutEffect(() => {
    // if menu item is hidden disable all media queries and get whole nav
    if (isFirstMount) return
    dispatch(disableMedia())
  }, [navStructure])

  useLayoutEffect(() => {
    // if media queries came disabled (after nav change), recalculate media query values
    if (isFirstMount) return
    if (mediaEnabled) return
    const { logoExtension, logoPart, icon, name, burger } = calcNavMediaQueryParams(navRef.current, logoRef.current)
    dispatch(setNavMediaQueryWidths({ logoExtension, logoPart, icon, name, burger }))
    dispatch(enableMedia())
  }, [mediaEnabled])

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
        marginTop: theme.nav.marginTop + 'px',
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
            display: 'none'
          },
          [`@media (max-width: ${mediaQueryWidth.burger}px)`]: {
            display: 'none'
          }
        },
        '& .nav-item-name': mediaEnabled && {
          [`@media (max-width: ${mediaQueryWidth.name}px)`]: {
            display: 'none'
          }
        },
        '& li:not(:last-child)': mediaEnabled && {
          [`@media (max-width: ${mediaQueryWidth.burger}px)`]: {
            display: 'none'
          }
        },
        '& li:last-child': {
          display: 'none',
          [`@media (max-width: ${mediaQueryWidth.burger}px)`]: mediaEnabled && {
            display: 'flex'
          }
        }
      }}
    >
      <Logo logoRef={logoRef}/>
      <NavList />
    </nav>
  )
}
