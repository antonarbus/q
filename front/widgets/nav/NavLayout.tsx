import { useSelector } from '@shared/lib/redux'
import { theme } from '@shared/theme'
import type { RefObject } from 'react'

type Props = {
  children: React.ReactNode
  navRef: RefObject<HTMLDivElement>
}

export const NavLayout = (props: Props): React.JSX.Element => {
  const mediaQueryWidth = useSelector((state) => state.nav.mediaQueryWidth)
  const mediaEnabled = useSelector((state) => state.nav.mediaEnabled)

  return (
    <nav
      ref={props.navRef}
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
      {props.children}
    </nav>
  )
}
