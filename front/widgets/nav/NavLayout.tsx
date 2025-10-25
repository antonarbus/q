import { navMediaQuery } from '@entities/nav/ui/navMediaQuery'
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

        // liquid glass
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        boxShadow:
          '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',

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
