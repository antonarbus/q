import { navMediaQuery } from '@shared/nav'
import { theme } from '@shared/theme'

type Props = {
  children: React.ReactNode
  navRef: React.RefObject<React.ComponentRef<'div'> | null>
}

export const NavLayout = (props: Props): React.JSX.Element => {
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
          [`@media (max-width: ${navMediaQuery.iconWidth}px) and (min-width: ${navMediaQuery.nameWidth}px)`]:
            {
              display: 'none',
            },
          [`@media (max-width: ${navMediaQuery.burgerWidth}px)`]: {
            display: 'none',
          },
        },
        '& .nav-item-name': {
          [`@media (max-width: ${navMediaQuery.nameWidth}px)`]: {
            display: 'none',
          },
        },
        '& li:not(:last-child)': {
          [`@media (max-width: ${navMediaQuery.burgerWidth}px)`]: {
            display: 'none',
          },
        },
        '& li:last-child': {
          display: 'none',
          [`@media (max-width: ${navMediaQuery.burgerWidth}px)`]: {
            display: 'flex',
          },
        },
      }}
    >
      {props.children}
    </nav>
  )
}
