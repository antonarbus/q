import { navMediaQuery } from '@shared/nav'
import { theme } from '@shared/theme'
import type { JSX, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const NavLayout = (props: Props): JSX.Element => {
  return (
    <nav
      css={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        position: 'sticky',
        top: '5px',
        marginBottom: `${theme.nav.marginBottom}px`,
        marginLeft: '10px',
        marginRight: '10px',
        height: `${theme.nav.height}px`,
        borderRadius: '4px',
        background: theme.colors.darkBackground,
        boxShadow: '0 0px 5px 0 #0000005c',
        zIndex: 6,
        contain: 'layout inline-size',
        fontWeight: 300,
        '& > ul > li > a .icon-round-wrapper': {
          [`@media (${navMediaQuery.widthWhenNamesDoNotFit}px <= width <= ${navMediaQuery.widthWhenIconsWithNamesDoNotFit}px)`]:
            {
              display: 'none',
            },
          [`@media (width <= ${navMediaQuery.widthWhenNamesDoNotFit}px)`]: {
            marginRight: '24px',
          },
        },
        '& .nav-item-name': {
          [`@media (width <= ${navMediaQuery.widthWhenNamesDoNotFit}px)`]: {
            display: 'none',
          },
        },
      }}
    >
      {props.children}
    </nav>
  )
}
