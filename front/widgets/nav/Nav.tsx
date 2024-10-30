import { dispatch, useSelectorTyped } from '@lib_instances/store'
import { theme } from '@lib_instances/theme'
import { useRef } from 'react'
import { useEffectOnce } from 'react-use'
import { navSlice, useMediaQueryValues, Logo, NavList } from '@shared/nav'
import { navStructure } from './navStructure'
import { usePressNavShortcuts } from '@features/nav/press_shortcuts'

export const Nav = (): React.JSX.Element => {
  const navRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const mediaQueryWidth = useSelectorTyped((state) => state.nav.mediaQueryWidth)
  const mediaEnabled = useSelectorTyped((state) => state.nav.mediaEnabled)
  usePressNavShortcuts({ navStructure })
  useMediaQueryValues({ navRef, logoRef })
  useEffectOnce(() => {
    dispatch(navSlice.actions.addNavStructure({ navStructure }))
  })

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
        marginBottom: `${String(theme.nav.marginBottom)}px`,
        marginLeft: '10px',
        marginRight: '10px',
        height: `${String(theme.nav.height)}px`,
        borderRadius: '4px',
        background: theme.colors.darkBackground,
        boxShadow: '0 0px 5px 0 #0000005c',
        zIndex: 6,
        contain: 'layout inline-size',
        fontWeight: 300,
        '& > ul > li > a .icon-round-wrapper': mediaEnabled && {
          [`@media (max-width: ${String(mediaQueryWidth.icon)}px) and (min-width: ${String(mediaQueryWidth.name)}px)`]:
            {
              display: 'none',
            },
          [`@media (max-width: ${String(mediaQueryWidth.burger)}px)`]: {
            display: 'none',
          },
        },
        '& .nav-item-name': mediaEnabled && {
          [`@media (max-width: ${String(mediaQueryWidth.name)}px)`]: {
            display: 'none',
          },
        },
        '& li:not(:last-child)': mediaEnabled && {
          [`@media (max-width: ${String(mediaQueryWidth.burger)}px)`]: {
            display: 'none',
          },
        },
        '& li:last-child': {
          display: 'none',
          [`@media (max-width: ${String(mediaQueryWidth.burger)}px)`]:
            mediaEnabled && {
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
